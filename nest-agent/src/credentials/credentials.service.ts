import { Inject, Injectable } from '@nestjs/common';
import { CustomAgent, getAllCredentials } from 'src/agent/agentUtils';
import { AGENT_TOKEN } from 'src/constants';

@Injectable()
export class CredentialsService {
  constructor(@Inject(AGENT_TOKEN) private readonly agent: CustomAgent) {}
  getAllCredentials() {
    return getAllCredentials(this.agent);
  }
}
