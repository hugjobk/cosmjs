import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgUnjail } from "cosmjs-types/cosmos/slashing/v1beta1/tx";

export const slashingTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.slashing.v1beta1.MsgUnjail", MsgUnjail],
];

export interface MsgUnjailEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmos.slashing.v1beta1.MsgUnjail";
  readonly value: Partial<MsgUnjail>;
}

export function isMsgUnjailEncodeObject(o: EncodeObject): o is MsgUnjailEncodeObject {
  return (o as MsgUnjailEncodeObject).typeUrl === "/cosmos.slashing.v1beta1.MsgUnjail";
}
