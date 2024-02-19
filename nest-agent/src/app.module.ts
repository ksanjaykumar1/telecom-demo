import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './agent/agent.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionsModule } from './connections/connections.module';
import { CredentialDefinitionModule } from './credential-definition/credential-definition.module';
import { CredentialModule } from './credential/credential.module';
import { CredentialsModule } from './credentials/credentials.module';
import { IssueCredentialModule } from './issue-credential/issue-credential.module';
import { LedgerModule } from './ledger/ledger.module';
import { OutOfBandModule } from './out-of-band/out-of-band.module';
import { PresentProofModule } from './present-proof/present-proof.module';
import { RevocationModule } from './revocation/revocation.module';
import { SchemaModule } from './schema/schema.module';
import { WalletModule } from './wallet/wallet.module';
import { ListenerModule } from './listener/listener.module';

import appConfig from './config/app.config';
import { AGENT_TOKEN } from './constants';
import { CustomAgent } from './agent/agentUtils';
import { ListenerService } from './listener/listener.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    AgentModule,
    ConnectionsModule,
    CredentialDefinitionModule,
    CredentialModule,
    CredentialsModule,
    IssueCredentialModule,
    LedgerModule,
    OutOfBandModule,
    PresentProofModule,
    RevocationModule,
    SchemaModule,
    WalletModule,
    ListenerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    @Inject(AGENT_TOKEN) private agent: CustomAgent,
    private readonly listenerService: ListenerService,
    private readonly configService: ConfigService,
  ) {
    this.listenerService.messageListener();
    const agentType: string = this.configService.get('agent.type');
    if (agentType === 'holder') {
      this.listenerService.credentialListener();
      this.listenerService.ProofRequestReceivedListener();
    } else if (agentType === 'verifier') {
      this.listenerService.ProofRequestVerifiedListener();
    } else if (agentType === 'issuer') {
    }
  }
}
