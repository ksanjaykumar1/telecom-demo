import { Module } from '@nestjs/common';
import { CredentialController } from './credential.controller';

@Module({
  controllers: [CredentialController],
})
export class CredentialModule {}
