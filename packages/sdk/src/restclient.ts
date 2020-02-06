import { Encoding } from "@iov/encoding";
import axios, { AxiosInstance } from "axios";

import { AminoTx, BaseAccount, CodeInfo, ContractInfo, isAminoStdTx, StdTx, WasmData } from "./types";

const { fromBase64, fromUtf8, toHex, toUtf8 } = Encoding;

interface NodeInfo {
  readonly network: string;
}

interface NodeInfoResponse {
  readonly node_info: NodeInfo;
}

interface BlockMeta {
  readonly header: {
    readonly height: number;
    readonly time: string;
    readonly num_txs: number;
  };
  readonly block_id: {
    readonly hash: string;
  };
}

interface Block {
  readonly header: {
    readonly height: number;
  };
}

interface BlocksResponse {
  readonly block_meta: BlockMeta;
  readonly block: Block;
}

interface AuthAccountsResponse {
  readonly result: {
    readonly value: BaseAccount;
  };
}

// Currently all wasm query responses return json-encoded strings...
// later deprecate this and use the specific types for result
// (assuming it is inlined, no second parse needed)
type WasmResponse = WasmSuccess | WasmError;

interface WasmSuccess {
  readonly height: string;
  readonly result: string;
}

interface WasmError {
  readonly error: string;
}

export interface TxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly raw_log: string;
  readonly tx: AminoTx;
}

interface SearchTxsResponse {
  readonly total_count: string;
  readonly count: string;
  readonly page_number: string;
  readonly page_total: string;
  readonly limit: string;
  readonly txs: readonly TxsResponse[];
}

interface PostTxsParams {}

export interface PostTxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly code?: number;
  readonly raw_log?: string;
  /** The same as `raw_log` but deserialized? */
  readonly logs?: object;
  /** The gas limit as set by the user */
  readonly gas_wanted?: string;
  /** The gas used by the execution */
  readonly gas_used?: string;
}

interface EncodeTxResponse {
  // base64-encoded amino-binary encoded representation
  readonly tx: string;
}

type RestClientResponse =
  | NodeInfoResponse
  | BlocksResponse
  | AuthAccountsResponse
  | TxsResponse
  | SearchTxsResponse
  | PostTxsResponse
  | EncodeTxResponse
  | WasmResponse;

type BroadcastMode = "block" | "sync" | "async";

function isWasmError(resp: WasmResponse): resp is WasmError {
  return (resp as WasmError).error !== undefined;
}

function parseWasmResponse(response: WasmResponse): any {
  if (isWasmError(response)) {
    throw new Error(response.error);
  }
  return JSON.parse(response.result);
}

export class RestClient {
  private readonly client: AxiosInstance;
  // From https://cosmos.network/rpc/#/ICS0/post_txs
  // The supported broadcast modes include "block"(return after tx commit), "sync"(return afer CheckTx) and "async"(return right away).
  private readonly mode: BroadcastMode;

  public constructor(url: string, mode: BroadcastMode = "block") {
    const headers = {
      post: { "Content-Type": "application/json" },
    };
    this.client = axios.create({
      baseURL: url,
      headers: headers,
    });
    this.mode = mode;
  }

  public async get(path: string): Promise<RestClientResponse> {
    const { data } = await this.client.get(path);
    if (data === null) {
      throw new Error("Received null response from server");
    }
    return data;
  }

  public async post(path: string, params: PostTxsParams): Promise<RestClientResponse> {
    const { data } = await this.client.post(path, params);
    if (data === null) {
      throw new Error("Received null response from server");
    }
    return data;
  }

  public async nodeInfo(): Promise<NodeInfoResponse> {
    const responseData = await this.get("/node_info");
    if (!(responseData as any).node_info) {
      throw new Error("Unexpected response data format");
    }
    return responseData as NodeInfoResponse;
  }

  public async blocksLatest(): Promise<BlocksResponse> {
    const responseData = await this.get("/blocks/latest");
    if (!(responseData as any).block) {
      throw new Error("Unexpected response data format");
    }
    return responseData as BlocksResponse;
  }

  public async blocks(height: number): Promise<BlocksResponse> {
    const responseData = await this.get(`/blocks/${height}`);
    if (!(responseData as any).block) {
      throw new Error("Unexpected response data format");
    }
    return responseData as BlocksResponse;
  }

  /** returns the amino-encoding of the transaction performed by the server */
  public async encodeTx(stdTx: StdTx): Promise<Uint8Array> {
    const tx = { type: "cosmos-sdk/StdTx", value: stdTx };
    const responseData = await this.post("/txs/encode", tx);
    if (!(responseData as any).tx) {
      throw new Error("Unexpected response data format");
    }
    return Encoding.fromBase64((responseData as EncodeTxResponse).tx);
  }

  public async authAccounts(address: string, height?: string): Promise<AuthAccountsResponse> {
    const path =
      height === undefined ? `/auth/accounts/${address}` : `/auth/accounts/${address}?tx.height=${height}`;
    const responseData = await this.get(path);
    if ((responseData as any).result.type !== "cosmos-sdk/Account") {
      throw new Error("Unexpected response data format");
    }
    return responseData as AuthAccountsResponse;
  }

  public async txs(query: string): Promise<SearchTxsResponse> {
    const responseData = await this.get(`/txs?${query}`);
    if (!(responseData as any).txs) {
      throw new Error("Unexpected response data format");
    }
    return responseData as SearchTxsResponse;
  }

  public async txsById(id: string): Promise<TxsResponse> {
    const responseData = await this.get(`/txs/${id}`);
    if (!(responseData as any).tx) {
      throw new Error("Unexpected response data format");
    }
    return responseData as TxsResponse;
  }

  // tx must be JSON encoded StdTx (no wrapper)
  public async postTx(tx: Uint8Array): Promise<PostTxsResponse> {
    // TODO: check this is StdTx
    const decoded = JSON.parse(fromUtf8(tx));
    if (!isAminoStdTx(decoded)) {
      throw new Error("Must be json encoded StdTx");
    }
    const params = {
      tx: decoded,
      mode: this.mode,
    };
    const responseData = await this.post("/txs", params);
    if (!(responseData as any).txhash) {
      throw new Error("Unexpected response data format");
    }
    return responseData as PostTxsResponse;
  }

  // wasm rest queries are listed here: https://github.com/cosmwasm/wasmd/blob/master/x/wasm/client/rest/query.go#L19-L27
  public async listCodeInfo(): Promise<readonly CodeInfo[]> {
    const path = `/wasm/code`;
    const responseData = await this.get(path);
    // answer may be null (empty array)
    return parseWasmResponse(responseData as WasmResponse) || [];
  }

  // this will download the original wasm bytecode by code id
  // throws error if no code with this id
  public async getCode(id: number): Promise<Uint8Array> {
    // TODO: broken currently
    const path = `/wasm/code/${id}`;
    const responseData = await this.get(path);
    const { code } = parseWasmResponse(responseData as WasmResponse);
    return fromBase64(code);
  }

  public async listContractAddresses(): Promise<readonly string[]> {
    const path = `/wasm/contract`;
    const responseData = await this.get(path);
    // answer may be null (go's encoding of empty array)
    const addresses: string[] | null = parseWasmResponse(responseData as WasmResponse);
    return addresses || [];
  }

  // throws error if no contract at this address
  public async getContractInfo(address: string): Promise<ContractInfo> {
    const path = `/wasm/contract/${address}`;
    const responseData = await this.get(path);
    // rest server returns null if no data for the address
    const info: ContractInfo | null = parseWasmResponse(responseData as WasmResponse);
    if (!info) {
      throw new Error(`No contract with address ${address}`);
    }
    return info;
  }

  // Returns all contract state.
  // This is an empty array if no such contract, or contract has no data.
  public async getAllContractState(address: string): Promise<readonly WasmData[]> {
    const path = `/wasm/contract/${address}/state`;
    const responseData = await this.get(path);
    return parseWasmResponse(responseData as WasmResponse);
  }

  // Returns the data at the key if present (unknown decoded json),
  // or null if no data at this (contract address, key) pair
  public async queryContractRaw(address: string, key: Uint8Array): Promise<unknown | null> {
    const hexKey = toHex(key);
    const path = `/wasm/contract/${address}/raw/${hexKey}?encoding=hex`;
    const responseData = await this.get(path);
    const data: readonly WasmData[] = parseWasmResponse(responseData as WasmResponse);
    return data.length === 0 ? null : data[0].val;
  }

  // Makes a "smart query" on the contract, returns response verbatim (json.RawMessage)
  // Throws error if no such contract or invalid query format
  public async queryContractSmart(address: string, query: object): Promise<unknown> {
    const encoded = toHex(toUtf8(JSON.stringify(query)));
    const path = `/wasm/contract/${address}/smart/${encoded}?encoding=hex`;
    const responseData = (await this.get(path)) as WasmResponse;
    if (isWasmError(responseData)) {
      throw new Error(responseData.error);
    }
    // no extra parse here
    return responseData.result;
  }
}