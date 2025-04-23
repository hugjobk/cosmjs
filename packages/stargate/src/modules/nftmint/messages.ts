import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateClass, MsgMint, MsgTransferClass, MsgUpdateClass } from "cosmjs-types/titan/nftmint/tx";

export const nftmintTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/titan.nftmint.MsgCreateClass", MsgCreateClass],
  ["/titan.nftmint.MsgUpdateClass", MsgUpdateClass],
  ["/titan.nftmint.MsgTransferClass", MsgTransferClass],
  ["/titan.nftmint.MsgMint", MsgMint],
];

export interface MsgCreateClassEncodeObject extends EncodeObject {
  readonly typeUrl: "/titan.nftmint.MsgCreateClass";
  readonly value: Partial<MsgCreateClass>;
}

export function isMsgCreateClassEncodeObject(o: EncodeObject): o is MsgCreateClassEncodeObject {
  return (o as MsgCreateClassEncodeObject).typeUrl === "/titan.nftmint.MsgCreateClass";
}

export interface MsgUpdateClassEncodeObject extends EncodeObject {
  readonly typeUrl: "/titan.nftmint. MsgUpdateClass";
  readonly value: Partial<MsgUpdateClass>;
}

export function isMsgUpdateClassEncodeObject(o: EncodeObject): o is MsgUpdateClassEncodeObject {
  return (o as MsgUpdateClassEncodeObject).typeUrl === "/titan.nftmint. MsgUpdateClass";
}

export interface MsgTransferClassEncodeObject extends EncodeObject {
  readonly typeUrl: "/titan.nftmint.MsgTransferClass";
  readonly value: Partial<MsgTransferClass>;
}

export function isMsgTransferClassEncodeObject(o: EncodeObject): o is MsgTransferClassEncodeObject {
  return (o as MsgTransferClassEncodeObject).typeUrl === "/titan.nftmint.MsgTransferClass";
}

export interface MsgMintEncodeObject extends EncodeObject {
  readonly typeUrl: "/titan.nftmint.MsgMint";
  readonly value: Partial<MsgCreateClass>;
}

export function isMsgMintEncodeObject(o: EncodeObject): o is MsgMintEncodeObject {
  return (o as MsgMintEncodeObject).typeUrl === "/titan.nftmint.MsgMint";
}
