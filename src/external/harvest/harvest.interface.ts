export interface HarvestVaultResponse {
  eth: Map<string, HarvestVaultData>,
  matic: Map<string, HarvestVaultData>
}

export interface HarvestVaultData {
  vaultAddress: string
  totalValueLocked: number
  estimatedApy: number
}