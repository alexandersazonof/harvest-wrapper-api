import { TvlSubgraphRequest, TvlSubgraphResponse } from "./subgraph.interface";
import { gql, GraphQLClient } from "graphql-request";
import * as dotenv from "dotenv";

dotenv.config();

const MAINNET_SUBGRAPH_ID = process.env.MAINNET_SUBGRAPH_ID || '';
const MATIC_SUBGRAPH_ID = process.env.MATIC_SUBGRAPH_ID || '';

export const getTvlFromSubgraph = async (request: TvlSubgraphRequest): Promise<TvlSubgraphResponse[]> => {

  const graphQLClient = new GraphQLClient(`https://api.thegraph.com/subgraphs/id/${getSubGraphIdByNetwork(request.network)}`, { errorPolicy: 'all' })

  const query = gql`
      query getTvl($vault: String!, $orderBy: String!, $orderDirection: String!, $limit: Int!, $fromTimestamp: Int!){
          tvls(
              first: $limit
              where: {vault: $vault}
              orderBy: $orderBy
              orderDirection: $orderDirection
              timestamp_gte: $fromTimestamp
          ) {
              value
              timestamp
          }
      }
  `;

  const data = await graphQLClient.request(query,
    {
      vault: request.vault,
      orderBy: request.orderBy,
      orderDirection: request.orderDirection,
      limit: request.limit,
      fromTimestamp: request.fromTimestamp,
    }
  ).catch(err => {
    console.log(err);
  })
  console.log(JSON.stringify(data, undefined, 2))

  return data.tvls
}

function getSubGraphIdByNetwork(network: string = 'MAINNET'): string {
  switch (network) {
    case 'MATIC': return MATIC_SUBGRAPH_ID
    case 'MAINNET':
    default: return MAINNET_SUBGRAPH_ID
  }
}