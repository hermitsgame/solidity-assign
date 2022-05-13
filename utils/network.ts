export const CHAIN_ID = {
  MAINNET: "4689",
  TESTNET: "4690",
  HARDHAT: "31337",
}

export function isMainnet(networkId: string): boolean {
  return networkId == CHAIN_ID.MAINNET
}

export function isTestNetwork(networkId: string): boolean {
  return [
    CHAIN_ID.HARDHAT,
    CHAIN_ID.TESTNET
  ].includes(networkId)
}
