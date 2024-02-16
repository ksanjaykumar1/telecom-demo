import { Module } from '@nestjs/common';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';
import { AgentModule } from 'src/agent/agent.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AgentModule, ConfigModule],
  controllers: [SchemaController],
  providers: [SchemaService],
})
export class SchemaModule {}
