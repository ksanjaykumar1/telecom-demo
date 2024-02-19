import { Inject, Injectable } from '@nestjs/common';
import { CustomAgent, getCredentialById } from 'src/agent/agentUtils';
import { AGENT_TOKEN } from 'src/constants';

@Injectable()
export class CredentialService {
  constructor(@Inject(AGENT_TOKEN) private readonly agent: CustomAgent) {}

  getCredentialById(credentialRecordId: string) {
    return getCredentialById(this.agent, credentialRecordId);
  }
}
