import { encodeSecp256k1Signature } from "@cosmjs/amino";
import { Keccak256, Secp256k1 } from "@cosmjs/crypto";
import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import { getEVMCompatibleBech32Address } from "./evm_utils";
import { AccountData, DirectSignResponse, OfflineDirectSigner } from "./signer";
import { makeSignBytes } from "./signing";

/**
 * A wallet that holds a single ethsecp256k1 keypair.
 *
 * If you want to work with BIP39 mnemonics and multiple accounts, use DirectSecp256k1HdWallet.
 */
export class DirectEthSecp256k1Wallet implements OfflineDirectSigner {
  /**
   * Creates a DirectEthSecp256k1Wallet from the given private key
   *
   * @param privkey The private key.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  public static async fromKey(privkey: Uint8Array, prefix = "cosmos"): Promise<DirectEthSecp256k1Wallet> {
    const pubkey = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return new DirectEthSecp256k1Wallet(privkey, pubkey, prefix);
  }

  private readonly pubkey: Uint8Array;
  private readonly privkey: Uint8Array;
  private readonly prefix: string;

  private constructor(privkey: Uint8Array, pubkey: Uint8Array, prefix: string) {
    this.privkey = privkey;
    this.pubkey = pubkey;
    this.prefix = prefix;
  }

  private get address(): string {
    return getEVMCompatibleBech32Address(this.prefix, this.pubkey);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return [
      {
        algo: "secp256k1" as const,
        pubkey: Secp256k1.compressPubkey(this.pubkey),
        address: this.address,
      },
    ];
  }

  public async signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    const signBytes = makeSignBytes(signDoc);
    if (address !== this.address) {
      throw new Error(`Address ${address} not found in wallet`);
    }
    const hashedMessage = new Keccak256(signBytes).digest();
    const signature = await Secp256k1.createSignature(hashedMessage, this.privkey);
    const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
    const stdSignature = encodeSecp256k1Signature(
      Secp256k1.compressPubkey(this.pubkey),
      signatureBytes,
      "/ethermint.crypto.v1.ethsecp256k1.PubKey",
    );
    return {
      signed: signDoc,
      signature: stdSignature,
    };
  }
}
