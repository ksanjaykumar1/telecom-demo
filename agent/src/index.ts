import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { agent } from './agent/agent';
import { AGENT_TYPE } from './constants/constant';
import { createAndRegisterIndy } from './agent/did';
import morganMiddleware from './utils/morgan';
import Logger from './utils/loggers';
import connections from './routes/connections';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morganMiddleware);
app.post('/', (req: Request, res: Response) => {
  Logger.debug(req.body);
  res.send('Express + TypeScript Server');
});
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/connections', connections);
app.listen(port, async () => {
  try {
    await agent.initialize();
    if (AGENT_TYPE === 'issuer') {
      await createAndRegisterIndy(agent);
    }
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    Logger.error(error);
    // process.exit(1);
  }
  // Agent initialization
});
