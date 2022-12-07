export interface TvlSubgraphRequest {
  vault: string
  orderBy: string
  orderDirection: string
  fromTimestamp: number,
  network: string,
  limit: number
}

export interface TvlSubgraphResponse {
  value: number
  timestamp: number
}
