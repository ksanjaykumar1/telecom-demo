import { Module } from '@nestjs/common';
import { PresentProofController } from './present-proof.controller';
import { AgentModule } from 'src/agent/agent.module';
import { ConfigModule } from '@nestjs/config';
import { PresentProofService } from './present-proof.service';

@Module({
  imports: [AgentModule, ConfigModule],
  controllers: [PresentProofController],
  providers: [PresentProofService],
})
export class PresentProofModule {}
