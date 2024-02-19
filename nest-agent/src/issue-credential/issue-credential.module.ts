import { Module } from '@nestjs/common';
import { IssueCredentialController } from './issue-credential.controller';
import { ConfigModule } from '@nestjs/config';
import { AgentModule } from 'src/agent/agent.module';
import { IssueCredentialService } from './issue-credential.service';

@Module({
  imports: [AgentModule, ConfigModule],
  controllers: [IssueCredentialController],
  providers: [IssueCredentialService],
})
export class IssueCredentialModule {}
