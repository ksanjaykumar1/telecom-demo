import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PresentProofService } from './present-proof.service';
import { ProofRequestDto } from './dto/proof-request.dto/proof-request.dto';

@ApiTags('present-proof')
@Controller('present-proof')
export class PresentProofController {
  constructor(private readonly presentProofService: PresentProofService) {}
  @Post('/create-and-send')
  createAndSendProofRequest(@Body() proofRequestDto: ProofRequestDto) {
    return this.presentProofService.requestProof(proofRequestDto);
  }
}
