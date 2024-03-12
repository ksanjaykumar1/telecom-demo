import { Inject, Injectable } from '@nestjs/common';
import { ConnectionlessProofDto } from './dto/connectionless-proof.dto/connectionless-proof.dto';
import { AGENT_TOKEN } from 'src/constants';
import { CustomAgent } from 'src/agent/agentUtils';
import { connectionlessProofRequest } from 'src/agent/agentUtils/functions/proof';

@Injectable()
export class ConnectionlessProofService {
  constructor(@Inject(AGENT_TOKEN) private readonly agent: CustomAgent) {}

  requestConnectionlessProof(connectionlessProofDto: ConnectionlessProofDto) {
    return connectionlessProofRequest(this.agent, connectionlessProofDto);
  }
}
