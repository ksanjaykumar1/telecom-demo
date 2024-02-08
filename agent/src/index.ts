import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { agent } from './agent/agent';
import { AGENT_TYPE } from './constants/constant';
import { createAndRegisterIndy } from './agent/did';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
  // Agent initialization
  await agent.initialize();
  if (AGENT_TYPE === 'issuer') {
    await createAndRegisterIndy(agent);
  }

  console.log(`[server]: Server is running at http://localhost:${port}`);
});
