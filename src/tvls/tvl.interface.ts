export interface TvlRequest {
  vault: string
  orderBy: string
  orderDirection: string
  fromTimestamp: number,
  network: string,
  limit: number
}