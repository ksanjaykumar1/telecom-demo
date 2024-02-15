import { Module } from '@nestjs/common';
import { OutOfBandController } from './out-of-band.controller';

@Module({
  controllers: [OutOfBandController],
})
export class OutOfBandModule {}
