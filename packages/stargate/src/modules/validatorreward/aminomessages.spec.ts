/* eslint-disable @typescript-eslint/naming-convention */
import { coin } from "@cosmjs/proto-signing";
import { MsgFundRewardPool, MsgSetAuthority, MsgSetRate } from "cosmjs-types/titan/validatorreward/tx";

import { AminoTypes } from "../../aminotypes";
import {
  AminoMsgFundRewardPool,
  AminoMsgSetAuthority,
  AminoMsgSetRate,
  createValidatorRewardAminoConverters,
} from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgSetRate", () => {
      const msg: MsgSetRate = {
        authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        rate: "100000000000000000", // 0.1
      };
      const aminoTypes = new AminoTypes(createValidatorRewardAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/titan.validatorreward.MsgSetRate",
        value: msg,
      });
      const expected: AminoMsgSetRate = {
        type: "validatorreward/SetRate",
        value: {
          authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          rate: "0.100000000000000000", // 0.1
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgSetAuthority", () => {
      const msg: MsgSetAuthority = {
        authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        newAuthority: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoTypes = new AminoTypes(createValidatorRewardAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/titan.validatorreward.MsgSetAuthority",
        value: msg,
      });
      const expected: AminoMsgSetAuthority = {
        type: "validatorreward/SetAuthority",
        value: {
          authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          new_authority: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgFundRewardPool", () => {
      const msg: MsgFundRewardPool = {
        depositor: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        amount: [coin(1234, "ucosm")],
      };
      const aminoTypes = new AminoTypes(createValidatorRewardAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/titan.validatorreward.MsgFundRewardPool",
        value: msg,
      });
      const expected: AminoMsgFundRewardPool = {
        type: "validatorreward/FundRewardPool",
        value: {
          depositor: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          amount: [coin(1234, "ucosm")],
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgSetRate", () => {
      const aminoMsg: AminoMsgSetRate = {
        type: "validatorreward/SetRate",
        value: {
          authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          rate: "0.100000000000000000", // 0.1
        },
      };
      const msg = new AminoTypes(createValidatorRewardAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgSetRate = {
        authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        rate: "100000000000000000", // 0.1
      };
      expect(msg).toEqual({
        typeUrl: "/titan.validatorreward.MsgSetRate",
        value: expectedValue,
      });
    });

    it("works for MsgSetAuthority", () => {
      const aminoMsg: AminoMsgSetAuthority = {
        type: "validatorreward/SetAuthority",
        value: {
          authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          new_authority: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      const msg = new AminoTypes(createValidatorRewardAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgSetAuthority = {
        authority: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        newAuthority: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      expect(msg).toEqual({
        typeUrl: "/titan.validatorreward.MsgSetAuthority",
        value: expectedValue,
      });
    });

    it("works for MsgFundRewardPool", () => {
      const aminoMsg: AminoMsgFundRewardPool = {
        type: "validatorreward/FundRewardPool",
        value: {
          depositor: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          amount: [coin(1234, "ucosm")],
        },
      };
      const msg = new AminoTypes(createValidatorRewardAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgFundRewardPool = {
        depositor: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        amount: [coin(1234, "ucosm")],
      };
      expect(msg).toEqual({
        typeUrl: "/titan.validatorreward.MsgFundRewardPool",
        value: expectedValue,
      });
    });
  });
});
