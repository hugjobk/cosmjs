/* eslint-disable @typescript-eslint/naming-convention */
import { MsgCreateClass, MsgMint, MsgTransferClass, MsgUpdateClass } from "cosmjs-types/titan/nftmint/tx";

import { AminoTypes } from "../../aminotypes";
import {
  AminoMsgCreateClass,
  AminoMsgMint,
  AminoMsgTransferClass,
  AminoMsgUpdateClass,
  createNftmintAminoConverters,
} from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgCreateClass", () => {
      const msg: MsgCreateClass = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        name: "Name",
        symbol: "Symbol",
        description: "Description",
        uri: "ipfs://CID",
        uriHash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
        data: "{}",
      };
      const aminoTypes = new AminoTypes(createNftmintAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/titan.nftmint.MsgCreateClass",
        value: msg,
      });
      const expected: AminoMsgCreateClass = {
        type: "nftmint/CreateClass",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          name: "Name",
          symbol: "Symbol",
          description: "Description",
          uri: "ipfs://CID",
          uri_hash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
          data: "{}",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgUpdateClass", () => {
      const msg: MsgUpdateClass = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        id: "1",
        name: "Name",
        symbol: "Symbol",
        description: "Description",
        uri: "ipfs://CID",
        uriHash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
        data: "{}",
      };
      const aminoTypes = new AminoTypes(createNftmintAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/titan.nftmint.MsgUpdateClass",
        value: msg,
      });
      const expected: AminoMsgUpdateClass = {
        type: "nftmint/UpdateClass",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          id: "1",
          name: "Name",
          symbol: "Symbol",
          description: "Description",
          uri: "ipfs://CID",
          uri_hash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
          data: "{}",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgTransferClass", () => {
      const msg: MsgTransferClass = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        classId: "1",
        receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
      };
      const aminoTypes = new AminoTypes(createNftmintAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/titan.nftmint.MsgTransferClass",
        value: msg,
      });
      const expected: AminoMsgTransferClass = {
        type: "nftmint/TransferClass",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          class_id: "1",
          receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgMint", () => {
      const msg: MsgMint = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        classId: "1",
        uri: "ipfs://CID",
        uriHash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
        data: "{}",
      };
      const aminoTypes = new AminoTypes(createNftmintAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/titan.nftmint.MsgMint",
        value: msg,
      });
      const expected: AminoMsgMint = {
        type: "nftmint/Mint",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          class_id: "1",
          uri: "ipfs://CID",
          uri_hash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
          data: "{}",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgCreateClass", () => {
      const aminoMsg: AminoMsgCreateClass = {
        type: "nftmint/CreateClass",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          name: "Name",
          symbol: "Symbol",
          description: "Description",
          uri: "ipfs://CID",
          uri_hash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
          data: "{}",
        },
      };
      const msg = new AminoTypes(createNftmintAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgCreateClass = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        name: "Name",
        symbol: "Symbol",
        description: "Description",
        uri: "ipfs://CID",
        uriHash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
        data: "{}",
      };
      expect(msg).toEqual({
        typeUrl: "/titan.nftmint.MsgCreateClass",
        value: expectedValue,
      });
    });

    it("works for MsgUpdateClass", () => {
      const aminoMsg: AminoMsgUpdateClass = {
        type: "nftmint/UpdateClass",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          id: "1",
          name: "Name",
          symbol: "Symbol",
          description: "Description",
          uri: "ipfs://CID",
          uri_hash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
          data: "{}",
        },
      };
      const msg = new AminoTypes(createNftmintAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgUpdateClass = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        id: "1",
        name: "Name",
        symbol: "Symbol",
        description: "Description",
        uri: "ipfs://CID",
        uriHash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
        data: "{}",
      };
      expect(msg).toEqual({
        typeUrl: "/titan.nftmint.MsgUpdateClass",
        value: expectedValue,
      });
    });

    it("works for MsgTransferClass", () => {
      const aminoMsg: AminoMsgTransferClass = {
        type: "nftmint/TransferClass",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          class_id: "1",
          receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        },
      };
      const msg = new AminoTypes(createNftmintAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgTransferClass = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        classId: "1",
        receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
      };
      expect(msg).toEqual({
        typeUrl: "/titan.nftmint.MsgTransferClass",
        value: expectedValue,
      });
    });

    it("works for MsgMint", () => {
      const aminoMsg: AminoMsgMint = {
        type: "nftmint/Mint",
        value: {
          creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
          receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          class_id: "1",
          uri: "ipfs://CID",
          uri_hash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
          data: "{}",
        },
      };
      const msg = new AminoTypes(createNftmintAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgMint = {
        creator: "cosmos1dye4wn0p2w0hfpg90mqjdwqvxufz8vfdww8mmv",
        receiver: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        classId: "1",
        uri: "ipfs://CID",
        uriHash: "iO7ZXfhhD527M5CtNHdzIhf2hwrqkzi8",
        data: "{}",
      };
      expect(msg).toEqual({
        typeUrl: "/titan.nftmint.MsgMint",
        value: expectedValue,
      });
    });
  });
});
