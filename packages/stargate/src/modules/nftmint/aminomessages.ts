/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg } from "@cosmjs/amino";
import { MsgCreateClass, MsgMint, MsgTransferClass, MsgUpdateClass } from "cosmjs-types/titan/nftmint/tx";

import { AminoConverter } from "../..";

/** Creates a new class. */
export interface AminoMsgCreateClass extends AminoMsg {
  readonly type: "nftmint/CreateClass";
  readonly value: {
    readonly creator: string;
    readonly name: string;
    readonly symbol: string;
    readonly description: string;
    readonly uri: string;
    readonly uri_hash: string;
    readonly data: string;
  };
}

export function isAminoMsgCreateClass(msg: AminoMsg): msg is AminoMsgCreateClass {
  return msg.type === "nftmint/CreateClass";
}

/** Updates a class. */
export interface AminoMsgUpdateClass extends AminoMsg {
  readonly type: "nftmint/UpdateClass";
  readonly value: {
    readonly creator: string;
    readonly id: string;
    readonly name: string;
    readonly symbol: string;
    readonly description: string;
    readonly uri: string;
    readonly uri_hash: string;
    readonly data: string;
  };
}

export function isAminoMsgUpdateClass(msg: AminoMsg): msg is AminoMsgUpdateClass {
  return msg.type === "nftmint/UpdateClass";
}

/** Transfers a class. */
export interface AminoMsgTransferClass extends AminoMsg {
  readonly type: "nftmint/TransferClass";
  readonly value: {
    readonly creator: string;
    readonly class_id: string;
    readonly receiver: string;
  };
}

export function isAminoMsgTransferClass(msg: AminoMsg): msg is AminoMsgTransferClass {
  return msg.type === "nftmint/TransferClass";
}

/** Mints a new NFT. */
export interface AminoMsgMint extends AminoMsg {
  readonly type: "nftmint/Mint";
  readonly value: {
    readonly creator: string;
    readonly receiver: string;
    readonly class_id: string;
    readonly uri: string;
    readonly uri_hash: string;
    readonly data: string;
  };
}

export function isAminoMsgMint(msg: AminoMsg): msg is AminoMsgMint {
  return msg.type === "nftmint/Mint";
}

export function createNftmintAminoConverters(): Record<string, AminoConverter> {
  return {
    "/titan.nftmint.MsgCreateClass": {
      aminoType: "nftmint/CreateClass",
      toAmino: ({
        creator,
        name,
        symbol,
        description,
        uri,
        uriHash,
        data,
      }: MsgCreateClass): AminoMsgCreateClass["value"] => {
        return {
          creator: creator,
          name: name,
          symbol: symbol,
          description: description,
          uri: uri,
          uri_hash: uriHash,
          data: data,
        };
      },
      fromAmino: ({
        creator,
        name,
        symbol,
        description,
        uri,
        uri_hash,
        data,
      }: AminoMsgCreateClass["value"]): MsgCreateClass => ({
        creator: creator,
        name: name,
        symbol: symbol,
        description: description,
        uri: uri,
        uriHash: uri_hash,
        data: data,
      }),
    },
    "/titan.nftmint.MsgUpdateClass": {
      aminoType: "nftmint/UpdateClass",
      toAmino: ({
        creator,
        id,
        name,
        symbol,
        description,
        uri,
        uriHash,
        data,
      }: MsgUpdateClass): AminoMsgUpdateClass["value"] => {
        return {
          creator: creator,
          id: id,
          name: name,
          symbol: symbol,
          description: description,
          uri: uri,
          uri_hash: uriHash,
          data: data,
        };
      },
      fromAmino: ({
        creator,
        id,
        name,
        symbol,
        description,
        uri,
        uri_hash,
        data,
      }: AminoMsgUpdateClass["value"]): MsgUpdateClass => ({
        creator: creator,
        id: id,
        name: name,
        symbol: symbol,
        description: description,
        uri: uri,
        uriHash: uri_hash,
        data: data,
      }),
    },
    "/titan.nftmint.MsgTransferClass": {
      aminoType: "nftmint/TransferClass",
      toAmino: ({ creator, classId, receiver }: MsgTransferClass): AminoMsgTransferClass["value"] => {
        return {
          creator: creator,
          class_id: classId,
          receiver: receiver,
        };
      },
      fromAmino: ({ creator, class_id, receiver }: AminoMsgTransferClass["value"]): MsgTransferClass => ({
        creator: creator,
        classId: class_id,
        receiver: receiver,
      }),
    },
    "/titan.nftmint.MsgMint": {
      aminoType: "nftmint/Mint",
      toAmino: ({ creator, receiver, classId, uri, uriHash, data }: MsgMint): AminoMsgMint["value"] => {
        return {
          creator: creator,
          receiver: receiver,
          class_id: classId,
          uri: uri,
          uri_hash: uriHash,
          data: data,
        };
      },
      fromAmino: ({ creator, receiver, class_id, uri, uri_hash, data }: AminoMsgMint["value"]): MsgMint => ({
        creator: creator,
        receiver: receiver,
        classId: class_id,
        uri: uri,
        uriHash: uri_hash,
        data: data,
      }),
    },
  };
}
