import { Module } from '@nestjs/common';
import { ConnectionlessProofController } from './connectionless-proof.controller';
import { ConnectionlessProofService } from './connectionless-proof.service';
import { ConfigModule } from '@nestjs/config';
import { AgentModule } from 'src/agent/agent.module';

@Module({
  imports: [AgentModule, ConfigModule],
  controllers: [ConnectionlessProofController],
  providers: [ConnectionlessProofService],
})
export class ConnectionlessProofModule {}
