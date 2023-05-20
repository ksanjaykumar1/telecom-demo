import { config } from 'dotenv';
config();
import * as fs from 'fs';

import {
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConnectionEventTypes,
  ConnectionStateChangedEvent,
  ConsoleLogger,
  DidExchangeState,
  HttpOutboundTransport,
  InitConfig,
  LogLevel,
  OutOfBandRecord,
  WsOutboundTransport,
  utils,
} from '@aries-framework/core';

import { HttpInboundTransport, agentDependencies } from '@aries-framework/node';

import qrcode from 'qrcode-terminal';

import { ledgers } from '../utils/ledgers';

const publicDidSeed = <string>process.env.PUBLIC_DID_SEED;
const schemaName = <string>process.env.SCHEMA_Name;
const mediatorInvitationUrl = <string>process.env.MEDIATOR_URL;
const label = <string>process.env.LABEL;
const env = <string>process.env.ENV;
// const agentPort = <number>(<unknown>process.env.AGENT_PORT);

let invitationUrl: string;
let agent: Agent;
let initialOutOfBandRecord: OutOfBandRecord;

const agentConfig: InitConfig = {
  logger: new ConsoleLogger(env === 'dev' ? LogLevel.trace : LogLevel.info),
  label: label + utils.uuid(),
  autoAcceptConnections: true,
  autoAcceptProofs: AutoAcceptProof.Always,
  autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
  mediatorConnectionsInvite: mediatorInvitationUrl,
  indyLedgers: ledgers,
  publicDidSeed,
  autoUpdateStorageOnStartup: true,
  walletConfig: {
    id: label,
    key: 'demoagentissuer00000000000000000',
    // storage: { type: 'sqlite' },
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
    initialOutOfBandRecord = await agent.oob.createInvitation();
    invitationUrl = initialOutOfBandRecord.outOfBandInvitation.toUrl({
      domain: 'https://example.org',
    });
    console.log(`Invitation URL ${invitationUrl}`);
    qrcode.generate(invitationUrl, { small: true });
  } catch (error) {}
}

const registerSchema = async (
  attributes: string[],
  name: string,
  version: string
) => {
  console.log('registerSchema');
  try {
    const schema = await agent.ledger.registerSchema({
      attributes,
      name,
      version,
    });
    console.log('schema');
    console.log(schema);
    fs.writeFileSync('./data/schema.json', JSON.stringify(schema));
    return schema;
  } catch (error) {
    console.log(error);
  }
};

const registerCredentialDefinition = async (schema: any) => {
  try {
    const credentialDefinition =
      await agent.ledger.registerCredentialDefinition({
        schema,
        supportRevocation: false,
        tag: 'latest',
      });
    fs.writeFileSync(
      './data/credentialDefinition.json',
      JSON.stringify(credentialDefinition)
    );

    return credentialDefinition;
  } catch (error) {}
};

const registerInitialScehmaAndCredDef = async () => {
  console.log('called registerInitialScehmaAndCredDef');

  const schema = await registerSchema(
    ['name', 'age'],
    schemaName + utils.uuid(),
    '1.0'
  );
  console.log(schema);
  const credentialDefinition = await registerCredentialDefinition(schema);
};

// send basic message

const sendMessage = async (connectionRecordId: string, message: string) => {
  await agent.basicMessages.sendMessage(connectionRecordId, message);
};

// Listners

const connectionListner = (outOfBandRecord: OutOfBandRecord) => {
  agent.events.on<ConnectionStateChangedEvent>(
    ConnectionEventTypes.ConnectionStateChanged,
    async ({ payload }) => {
      if (payload.connectionRecord.outOfBandId !== outOfBandRecord.id) return;
      if (payload.connectionRecord.state === DidExchangeState.Completed) {
        // the connection is now ready for usage in other protocols!
        console.log(
          `Connection for out-of-band id ${outOfBandRecord.id} completed`
        );

        await sendMessage(
          payload.connectionRecord.id,
          `Hello you are being connected us with connection record ${payload.connectionRecord.id}`
        );
      }
    }
  );
};

// connection Listner

// Credential Handler Listner i.e

// Proof Handler Listner

export {
  agent,
  invitationUrl,
  registerInitialScehmaAndCredDef,
  registerSchema,
  registerCredentialDefinition,
  initialOutOfBandRecord,
  connectionListner,
  sendMessage,
};
