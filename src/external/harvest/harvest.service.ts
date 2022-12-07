import { HarvestVaultResponse } from "./harvest.interface";
import fetch from 'node-fetch'
import * as dotenv from "dotenv";

dotenv.config();

const HARVEST_API_URL = process.env.HARVEST_API_URL || '';
const HARVEST_API_KEY = process.env.HARVEST_API_KEY || '';


export const getVaults = async (): Promise<HarvestVaultResponse> => {
  try {
    const response = await fetch(`${HARVEST_API_URL}vaults?key=${HARVEST_API_KEY}`)

    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    throw 'Cannot fetch data from Harvest API'
  }
}