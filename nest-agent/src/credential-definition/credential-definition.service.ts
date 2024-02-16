import { Agent } from '@aries-framework/core';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AGENT_TOKEN } from 'src/constants';
import { CreateCredentialDefinitionDto } from './dto/create-credential-definition.dto/create-credential-definition.dto';
import {
  createAndRegisterCredentialDefinition,
  getCredentialDefinitionById,
} from 'src/agent/agentUtils';

@Injectable()
export class CredentialDefinitionService {
  constructor(
    @Inject(AGENT_TOKEN) private readonly agent: Agent,
    private readonly configService: ConfigService,
  ) {}
  getCredentialDefinitionById(cred_def_id: string) {
    return getCredentialDefinitionById(this.agent, cred_def_id);
  }
  createAndRegisterCredentialDefinition(
    createCredentialDefinitionDto: CreateCredentialDefinitionDto,
  ) {
    if (!createCredentialDefinitionDto.issuerId) {
      createCredentialDefinitionDto.issuerId =
        this.configService.get('agent.did_namespace') +
        this.configService.get('agent.did');
    }
    return createAndRegisterCredentialDefinition(
      this.agent,
      createCredentialDefinitionDto,
    );
  }
}
