import * as dotenv from 'dotenv';
import express from 'express';
import { tvlRoute } from "./tvls/tvl.route";


dotenv.config();

if (!process.env.PORT) {
  console.log('Port is null')
  process.exit(1);
}


const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use('/api/v1/tvls', tvlRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
