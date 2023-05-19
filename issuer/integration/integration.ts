import { config } from 'dotenv';
config();

import {
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConsoleLogger,
  HttpOutboundTransport,
  InitConfig,
  LogLevel,
  WsOutboundTransport,
  utils,
} from '@aries-framework/core';

import { HttpInboundTransport, agentDependencies } from '@aries-framework/node';

import qrcode from 'qrcode-terminal';

import { ledgers } from '../utils/ledgers';

const publicDidSeed = <string>process.env.PUBLIC_DID_SEED;
const mediatorInvitationUrl = <string>process.env.MEDIATOR_URL;
const label = <string>process.env.LABEL;
// const agentPort = <number>(<unknown>process.env.AGENT_PORT);

let invitationUrl: string;
let agent: Agent;

const agentConfig: InitConfig = {
  logger: new ConsoleLogger(LogLevel.trace),
  label: label + utils.uuid(),
  autoAcceptConnections: true,
  autoAcceptProofs: AutoAcceptProof.Always,
  autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
  mediatorConnectionsInvite: mediatorInvitationUrl,
  indyLedgers: ledgers,
  publicDidSeed,
  walletConfig: {
    id: label,
    key: 'demoagentissuer00000000000000000',
  },
};

async function initializeAgent(agentConfig: InitConfig) {
  try {
    const agent = new Agent({
      config: agentConfig,
      dependencies: agentDependencies,
    });
    // Registering the required in- and outbound transports
    agent.registerOutboundTransport(new HttpOutboundTransport());
    //   agent.registerInboundTransport(new HttpInboundTransport({ port: agentPort }));
    agent.registerOutboundTransport(new WsOutboundTransport());
    console.log('Initializing agent...');
    await agent.initialize();
    console.log('Initializing agent... Success');

    console.log('Connecting to ledger...');
    // await agent.ledger.connectToPools();
    console.log('Connecting to ledger... Success');
    return agent;
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

export async function run() {
  agent = await initializeAgent(agentConfig);
  try {
    const outOfBandRecord = await agent.oob.createInvitation();
    invitationUrl = outOfBandRecord.outOfBandInvitation.toUrl({
      domain: 'https://example.org',
    });
    console.log(`Invitation URL ${invitationUrl}`);
    qrcode.generate(invitationUrl, { small: true });
  } catch (error) {}
}

export { agent, invitationUrl };
