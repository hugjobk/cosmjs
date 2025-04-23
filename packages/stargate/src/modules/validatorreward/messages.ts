import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgFundRewardPool, MsgSetAuthority, MsgSetRate } from "cosmjs-types/titan/validatorreward/tx";

export const validatorrewardTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/titan.validatorreward.MsgSetRate", MsgSetRate],
  ["/titan.validatorreward.MsgSetAuthority", MsgSetAuthority],
  ["/titan.validatorreward.MsgFundRewardPool", MsgFundRewardPool],
];

export interface MsgSetRateEncodeObject extends EncodeObject {
  readonly typeUrl: "/titan.validatorreward.MsgSetRate";
  readonly value: Partial<MsgSetRate>;
}

export function isMsgSetRateEncodeObject(o: EncodeObject): o is MsgSetRateEncodeObject {
  return (o as MsgSetRateEncodeObject).typeUrl === "/titan.validatorreward.MsgSetRate";
}

export interface MsgSetAuthorityEncodeObject extends EncodeObject {
  readonly typeUrl: "/titan.validatorreward.MsgSetAuthority";
  readonly value: Partial<MsgSetAuthority>;
}

export function isMsgSetAuthorityEncodeObject(o: EncodeObject): o is MsgSetAuthorityEncodeObject {
  return (o as MsgSetAuthorityEncodeObject).typeUrl === "/titan.validatorreward.MsgSetAuthority";
}

export interface MsgFundRewardPoolEncodeObject extends EncodeObject {
  readonly typeUrl: "/titan.validatorreward.MsgFundRewardPool";
  readonly value: Partial<MsgFundRewardPool>;
}

export function isMsgFundRewardPoolEncodeObject(o: EncodeObject): o is MsgFundRewardPoolEncodeObject {
  return (o as MsgFundRewardPoolEncodeObject).typeUrl === "/titan.validatorreward.MsgFundRewardPool";
}
