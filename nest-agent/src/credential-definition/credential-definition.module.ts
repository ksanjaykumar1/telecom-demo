import { Module } from '@nestjs/common';
import { AgentModule } from 'src/agent/agent.module';
import { ConfigModule } from '@nestjs/config';
import { CredentialDefinitionController } from './credential-definition.controller';
import { CredentialDefinitionService } from './credential-definition.service';

@Module({
  imports: [AgentModule, ConfigModule],
  controllers: [CredentialDefinitionController],
  providers: [CredentialDefinitionService],
})
export class CredentialDefinitionModule {}
