import { Inject, Injectable } from '@nestjs/common';
import { CustomAgent, offerAnoncredsCredential } from 'src/agent/agentUtils';
import { AGENT_TOKEN } from 'src/constants';
import { IssueCredentialDto } from './dto/issue-credential.dto/issue-credential.dto';

@Injectable()
export class IssueCredentialService {
  constructor(@Inject(AGENT_TOKEN) private readonly agent: CustomAgent) {}

  issueCredential(issueCredentialDto: IssueCredentialDto) {
    return offerAnoncredsCredential(this.agent, issueCredentialDto);
  }
}
