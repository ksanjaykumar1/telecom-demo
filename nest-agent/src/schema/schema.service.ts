import { Agent } from '@aries-framework/core';
import { Inject, Injectable } from '@nestjs/common';
import { createAndRegisterSchema, getSchemaById } from 'src/agent/agentUtils';
import { AGENT_TOKEN } from 'src/constants';
import { CreateSchemaDto } from './dto/create-schema.dto/create-schema.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SchemaService {
  constructor(
    @Inject(AGENT_TOKEN) private readonly agent: Agent,
    private readonly configService: ConfigService,
  ) {}

  createSchema(createSchemaDto: CreateSchemaDto) {
    // If user doesn't pass issuerID, it is fetched from config
    if (!createSchemaDto.issuerId) {
      createSchemaDto.issuerId =
        this.configService.get('agent.did_namespace') +
        this.configService.get('agent.did');
    }
    return createAndRegisterSchema(this.agent, createSchemaDto);
  }

  getSchemaById(schemaId: string) {
    return getSchemaById(this.agent, schemaId);
  }
}
