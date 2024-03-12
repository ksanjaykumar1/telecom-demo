import { Body, Controller, Post } from '@nestjs/common';
import { ConnectionlessProofService } from './connectionless-proof.service';
import { ConnectionlessProofDto } from './dto/connectionless-proof.dto/connectionless-proof.dto';

@Controller('connectionless-proof')
export class ConnectionlessProofController {
  constructor(
    private readonly connectionlessProofService: ConnectionlessProofService,
  ) {}
  @Post('/create-and-send')
  createAndSendProofRequest(
    @Body() connectionlessProofDto: ConnectionlessProofDto,
  ) {
    return this.connectionlessProofService.requestConnectionlessProof(
      connectionlessProofDto,
    );
  }
}
