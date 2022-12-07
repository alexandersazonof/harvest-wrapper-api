import { TvlRequest } from "./tvl.interface";
import { getTvlFromSubgraph } from "../external/subgraph/subgraph.service";
import { TvlSubgraphResponse } from "../external/subgraph/subgraph.interface";
import { getVaults } from "../external/harvest/harvest.service";
import { HarvestVaultData } from "../external/harvest/harvest.interface";

export const getTvl = async (request: TvlRequest): Promise<TvlSubgraphResponse[]> => {

  const data = await getTvlFromSubgraph({
    vault: request.vault,
    orderDirection: request.orderDirection,
    orderBy: request.orderBy,
    fromTimestamp: request.fromTimestamp,
    limit: request.limit,
    network: request.network
  })

  const vaultsData = await getVaults()


  const vault = Object.values(vaultsData.eth).find(i => i.vaultAddress != undefined && i.vaultAddress.toString().toLowerCase() == request.vault)

  data.unshift({
    value: vault.totalValueLocked,
    timestamp: Date.now()
  })

  data.pop()

  return data
}