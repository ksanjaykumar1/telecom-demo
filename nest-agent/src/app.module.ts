import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './agent/agent.module';
import { ConfigModule } from '@nestjs/config';
import { ConnectionsModule } from './connections/connections.module';
import { CredentialDefinitionController } from './credential-definition/credential-definition.controller';
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
import appConfig from './config/app.config';

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
  ],
  controllers: [AppController, CredentialDefinitionController],
  providers: [AppService],
})
export class AppModule {}
