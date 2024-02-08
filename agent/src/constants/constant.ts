import { config } from 'dotenv';
config();

/*AGENT_NAME is used to dynamically pick 
 which agent to define among the various Agent's value in env  */
export const AGENT_NAME: string = process.env.AGENT_NAME!;
export const AGENT_TYPE: string = process.env.AGENT_TYPE!;

export const LABEL: string = process.env[`${AGENT_NAME}LABEL`]!;
export const WALLET_ID: string = process.env[`${AGENT_NAME}WALLET_ID`]!;
export const WALLET_KEY: string = process.env[`${AGENT_NAME}WALLET_KEY`]!;
export const ENDPOINT: string = process.env[`${AGENT_NAME}ENDPOINT`]!;
export const PORT: number = process.env[`${AGENT_NAME}PORT`]
  ? parseInt(process.env[`${AGENT_NAME}PORT`]!, 10)
  : 3001;

export const DID_NAMESPACE: string = process.env.DID_NAMESPACE!;
export const SEED: string = process.env.SEED!;
export const DID: string = process.env.DID!;
