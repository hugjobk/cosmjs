import { Keccak256 } from "@cosmjs/crypto";
import { fromHex, toAscii, toBech32, toHex } from "@cosmjs/encoding";

export function getEVMCompatibleBech32Address(prefix: string, pubkey: Uint8Array) {
  const hash = new Keccak256(pubkey.slice(1)).digest();
  const lastTwentyBytes = toHex(hash.slice(-20));
  // EVM address
  const address = toChecksummedAddress("0x" + lastTwentyBytes);
  return getBech32AddressFromEVMAddress(address, prefix);
}

function toChecksummedAddress(address: string) {
  // 40 low hex characters
  let addressLower;
  if (typeof address === "string") {
    if (!isEVMAddress(address)) {
      throw new Error("Input is not a valid EVM address");
    }
    addressLower = address.toLowerCase().replace("0x", "");
  } else {
    addressLower = toHex(address);
  }

  const addressHash = toHex(new Keccak256(toAscii(addressLower)).digest());
  let checksumAddress = "0x";
  for (let i = 0; i < 40; i++) {
    checksumAddress += parseInt(addressHash[i], 16) > 7 ? addressLower[i].toUpperCase() : addressLower[i];
  }
  return checksumAddress;
}

function getBech32AddressFromEVMAddress(evmAddress: string, bech32Prefix: string): string {
  if (!isEVMAddress(evmAddress)) {
    throw new TypeError("Please provide a valid EVM compatible address.");
  }

  var evmAddrWithoutHexPrefix = evmAddress.replace(/^(-)?0x/i, "$1");
  var evmAddressBytes = fromHex(evmAddrWithoutHexPrefix);
  var evmToBech32Address = toBech32(bech32Prefix, evmAddressBytes);
  return evmToBech32Address;
}

function isEVMAddress(address: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
