import { Module } from '@nestjs/common';
import { PresentProofController } from './present-proof.controller';

@Module({
  controllers: [PresentProofController],
})
export class PresentProofModule {}
