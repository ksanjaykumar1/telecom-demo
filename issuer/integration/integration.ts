import { config } from 'dotenv';
config();
import * as fs from 'fs';

import {
  CredentialsModule,
  DidsModule,
  InitConfig,
  V2CredentialProtocol,
  MediationRecipientModule,
  ConnectionsModule,
  KeyDidResolver,
  AutoAcceptCredential,
  ProofsModule,
  AutoAcceptProof,
  V2ProofProtocol,
  Agent,
  OutOfBandRecord,
  LogLevel,
  utils,
  ConsoleLogger,
  HttpOutboundTransport,
  WsOutboundTransport,
  ConnectionStateChangedEvent,
  ConnectionEventTypes,
  DidExchangeState,
  KeyType,
  TypedArrayEncoder,
} from '@aries-framework/core';

import { HttpInboundTransport, agentDependencies } from '@aries-framework/node';

import qrcode from 'qrcode-terminal';

import { ledgers } from '../utils/ledgers';
import {
  AnonCredsCredentialFormatService,
  AnonCredsModule,
  AnonCredsProofFormatService,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1CredentialProtocol,
  V1ProofProtocol,
} from '@aries-framework/anoncreds';
import { AskarModule } from '@aries-framework/askar';
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidResolver,
  IndyVdrModule,
} from '@aries-framework/indy-vdr';
import { AnonCredsRsModule } from '@aries-framework/anoncreds-rs';

import { ariesAskar } from '@hyperledger/aries-askar-nodejs';
import { anoncreds } from '@hyperledger/anoncreds-nodejs';
import { indyVdr } from '@hyperledger/indy-vdr-nodejs';

const publicDidSeed = <string>process.env.PUBLIC_DID_SEED;
const issuerId = <string>process.env.ISSUER_DID;
const schemaName = <string>process.env.SCHEMA_Name;
const mediatorInvitationUrl = <string>process.env.MEDIATOR_URL;
const label = <string>process.env.LABEL;
const env = <string>process.env.ENV;
// const agentPort = <number>(<unknown>process.env.AGENT_PORT);

let invitationUrl: string;
let agent: Agent;
let initialOutOfBandRecord: OutOfBandRecord;

const agentConfig: InitConfig = {
  // logger: new ConsoleLogger(env === 'dev' ? LogLevel.trace : LogLevel.info),
  logger: new ConsoleLogger(LogLevel.info),
  label: label + utils.uuid(),
  walletConfig: {
    id: label,
    key: 'demoagentissuer00000000000000000',
  },
  // autoAcceptConnections: true,
  // autoAcceptProofs: AutoAcceptProof.Always,
  // autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
  // mediatorConnectionsInvite: mediatorInvitationUrl,
  // indyLedgers: ledgers,
  // publicDidSeed,
  // autoUpdateStorageOnStartup: true,
};

async function initializeAgent(agentConfig: InitConfig) {
  try {
    const legacyIndyCredentialFormatService =
      new LegacyIndyCredentialFormatService();
    const legacyIndyProofFormatService = new LegacyIndyProofFormatService();

    const agent = new Agent({
      config: agentConfig,
      dependencies: agentDependencies,
      modules: {
        connections: new ConnectionsModule({
          autoAcceptConnections: true,
        }),
        mediationRecipient: new MediationRecipientModule({
          mediatorInvitationUrl,
        }),
        credentials: new CredentialsModule({
          autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
          credentialProtocols: [
            new V1CredentialProtocol({
              indyCredentialFormat: legacyIndyCredentialFormatService,
            }),
            new V2CredentialProtocol({
              credentialFormats: [
                legacyIndyCredentialFormatService,
                new AnonCredsCredentialFormatService(),
              ],
            }),
          ],
        }),
        proofs: new ProofsModule({
          autoAcceptProofs: AutoAcceptProof.ContentApproved,
          proofProtocols: [
            new V1ProofProtocol({
              indyProofFormat: legacyIndyProofFormatService,
            }),
            new V2ProofProtocol({
              proofFormats: [
                legacyIndyProofFormatService,
                new AnonCredsProofFormatService(),
              ],
            }),
          ],
        }),
        anoncreds: new AnonCredsModule({
          registries: [new IndyVdrAnonCredsRegistry()],
        }),
        anoncredsRs: new AnonCredsRsModule({
          anoncreds,
        }),
        indyVdr: new IndyVdrModule({
          indyVdr,
          networks: [ledgers],
        }),
        dids: new DidsModule({
          resolvers: [new IndyVdrIndyDidResolver(), new KeyDidResolver()],
          registrars: [],
        }),
        askar: new AskarModule({
          ariesAskar,
        }),
      },
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

const importDID = async () => {
  console.log('issuerId');
  console.log(issuerId);
  agent.dids.import({
    did: issuerId,
    overwrite: true,
    privateKeys: [
      {
        keyType: KeyType.Ed25519,
        privateKey: TypedArrayEncoder.fromString(publicDidSeed),
      },
    ],
  });
};

const registerSchema = async (
  attributes: string[],
  name: string,
  version: string
) => {
  console.log('registerSchema');
  try {
    if (!issuerId) {
      throw new Error('Missing anoncred issuerId');
    }

    const schemaTemplate = {
      name: name + utils.uuid(),
      version: version,
      attrNames: attributes,
      issuerId: issuerId,
    };
    const { schemaState } = await agent.modules.anoncreds.registerSchema({
      schema: schemaTemplate,
      options: {
        endorserMode: 'internal',
        endorserDid: issuerId,
      },
    });
    console.log(schemaState);

    if (schemaState.state !== 'finished') {
      throw new Error(
        `Error registering schema: ${
          schemaState.state === 'failed' ? schemaState.reason : 'Not Finished'
        }`
      );
    }
    fs.writeFileSync('./data/schema.json', JSON.stringify(schemaState));
    return schemaState;
  } catch (error) {
    console.log(error);
  }
};

const registerCredentialDefinition = async (schema: any) => {
  try {
    const { credentialDefinitionState } =
      await agent.modules.anoncreds.registerCredentialDefinition({
        credentialDefinition: {
          schemaId: schema.schemaId,
          issuerId: issuerId,
          tag: 'latest',
        },
        options: {},
      });

    if (credentialDefinitionState.state !== 'finished') {
      throw new Error(
        `Error registering credential definition: ${
          credentialDefinitionState.state === 'failed'
            ? credentialDefinitionState.reason
            : 'Not Finished'
        }}`
      );
    }
    fs.writeFileSync(
      './data/credentialDefinition.json',
      JSON.stringify(credentialDefinitionState)
    );

    return credentialDefinitionState;
  } catch (error) {
    console.log(error);
  }
};

const registerInitialScehmaAndCredDef = async () => {
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
        // await agent.connections.returnWhenIsConnected(payload.connectionRecord.id)
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
  importDID,
};
