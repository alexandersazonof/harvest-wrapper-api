import express, { Request, Response } from "express";
import { getTvl } from "./tvl.service";

export const tvlRoute = express.Router();

// POST tvl by vault
tvlRoute.post('/', async (req: Request, res: Response) => {
  try {
    const data = await getTvl({
      vault: req.body.vault.toLowerCase() || '',
      orderDirection: req.body.orderDirection || 'desc',
      orderBy: req.body.orderBy || 'timestamp',
      fromTimestamp: req.body.fromTimestamp || 1,
      network: req.body.network || 'MAINNET',
      limit: req.body.limit || 1000
    })
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send(
      {
        message: 'Error during execute request, try later'
      }
    )
  }
})