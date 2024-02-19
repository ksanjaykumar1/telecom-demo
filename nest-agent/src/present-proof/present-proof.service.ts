import { Inject, Injectable } from '@nestjs/common';
import { CustomAgent } from 'src/agent/agentUtils';
import { requestAnoncredsProof } from 'src/agent/agentUtils/functions/proof';
import { AGENT_TOKEN } from 'src/constants';
import { ProofRequestDto } from './dto/proof-request.dto/proof-request.dto';

@Injectable()
export class PresentProofService {
  constructor(@Inject(AGENT_TOKEN) private readonly agent: CustomAgent) {}

  requestProof(proofRequestDto: ProofRequestDto) {
    return requestAnoncredsProof(this.agent, proofRequestDto);
  }
}
