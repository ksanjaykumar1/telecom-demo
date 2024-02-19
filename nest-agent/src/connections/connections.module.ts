import { Module } from '@nestjs/common';
import { ConnectionsController } from './connections.controller';
import { AgentModule } from 'src/agent/agent.module';
import { ConnectionsService } from './connections.service';
import { ListenerModule } from 'src/listener/listener.module';

@Module({
  imports: [AgentModule, ListenerModule],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
})
export class ConnectionsModule {}
