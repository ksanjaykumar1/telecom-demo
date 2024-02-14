import {
  AutoAcceptCredential,
  AutoAcceptProof,
  ConnectionsModule,
  CredentialsModule,
  DidsModule,
  KeyDidResolver,
  MediationRecipientModule,
  ProofsModule,
  V2CredentialProtocol,
  V2ProofProtocol,
} from '@aries-framework/core';
import { AskarModule } from '@aries-framework/askar';
import { ariesAskar } from '@hyperledger/aries-askar-nodejs';
import { AnonCredsRsModule } from '@aries-framework/anoncreds-rs';
import { anoncreds } from '@hyperledger/anoncreds-nodejs';
import {
  AnonCredsCredentialFormatService,
  AnonCredsModule,
  AnonCredsProofFormatService,
} from '@aries-framework/anoncreds';
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidRegistrar,
  IndyVdrIndyDidResolver,
  IndyVdrModule,
} from '@aries-framework/indy-vdr';
import { indyVdr } from '@hyperledger/indy-vdr-nodejs';
import { ConfigService } from '@nestjs/config';
import { bcovrinTestNetwork } from './networks';
import { AGENT_MODULES_TOKEN } from 'src/constants';

export const agentModuleFactory = {
  provide: AGENT_MODULES_TOKEN,
  useFactory: (configService: ConfigService) => {
    const { environment, mediator_url } = configService.get('agent');
    const mediatorInvitationUrl = environment === 'PUBLIC' ? mediator_url : '';
    return {
      askar: new AskarModule({ ariesAskar }),
      anoncredsRs: new AnonCredsRsModule({
        anoncreds,
      }),
      anoncreds: new AnonCredsModule({
        registries: [new IndyVdrAnonCredsRegistry()],
      }),
      indVdr: new IndyVdrModule({
        indyVdr,
        networks: [bcovrinTestNetwork],
      }),
      connections: new ConnectionsModule({ autoAcceptConnections: true }),
      dids: new DidsModule({
        registrars: [new IndyVdrIndyDidRegistrar()],
        resolvers: [new IndyVdrIndyDidResolver(), new KeyDidResolver()],
      }),
      credentials: new CredentialsModule({
        autoAcceptCredentials: AutoAcceptCredential.Always,
        credentialProtocols: [
          new V2CredentialProtocol({
            credentialFormats: [new AnonCredsCredentialFormatService()],
          }),
        ],
      }),
      proofs: new ProofsModule({
        autoAcceptProofs: AutoAcceptProof.Always,
        proofProtocols: [
          new V2ProofProtocol({
            proofFormats: [new AnonCredsProofFormatService()],
          }),
        ],
      }),
      mediationRecipient: new MediationRecipientModule({
        mediatorInvitationUrl: mediatorInvitationUrl,
      }),
    };
  },
  inject: [ConfigService],
};
