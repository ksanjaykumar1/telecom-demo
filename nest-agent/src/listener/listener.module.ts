import { Module } from '@nestjs/common';
import { ListenerService } from './listener.service';
import { AgentModule } from 'src/agent/agent.module';

@Module({
  imports: [AgentModule],
  providers: [ListenerService],
  exports: [ListenerService],
})
export class ListenerModule {}
