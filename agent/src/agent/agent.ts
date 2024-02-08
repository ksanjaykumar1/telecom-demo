import {
  Agent,
  ConsoleLogger,
  HttpOutboundTransport,
  InitConfig,
  LogLevel,
  WsOutboundTransport,
} from '@aries-framework/core';
import { HttpInboundTransport, agentDependencies } from '@aries-framework/node';
import {
  ENDPOINT,
  LABEL,
  PORT,
  WALLET_ID,
  WALLET_KEY,
} from '../constants/constant';
import { agentModules } from './agentModule';

const config: InitConfig = {
  label: LABEL,
  endpoints: [ENDPOINT],
  walletConfig: {
    id: WALLET_ID,
    key: WALLET_KEY,
  },
  logger: new ConsoleLogger(LogLevel.info),
};

type AgentModules = typeof agentModules;

export const agent = new Agent({
  config,
  dependencies: agentDependencies,
  modules: agentModules,
});
export type CustomAgent = Agent<AgentModules>;

agent.registerOutboundTransport(new HttpOutboundTransport());
agent.registerOutboundTransport(new WsOutboundTransport());
agent.registerInboundTransport(new HttpInboundTransport({ port: PORT }));
