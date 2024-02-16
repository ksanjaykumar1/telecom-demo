import { Module } from '@nestjs/common';
import { ConnectionsController } from './connections.controller';
import { AgentModule } from 'src/agent/agent.module';
import { ConnectionsService } from './connections.service';

@Module({
  imports: [AgentModule],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
})
export class ConnectionsModule {}
