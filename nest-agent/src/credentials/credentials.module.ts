import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { AgentModule } from 'src/agent/agent.module';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [AgentModule],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class CredentialsModule {}
