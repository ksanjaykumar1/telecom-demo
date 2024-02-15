import { Module } from '@nestjs/common';
import { RevocationController } from './revocation.controller';

@Module({
  controllers: [RevocationController],
})
export class RevocationModule {}
