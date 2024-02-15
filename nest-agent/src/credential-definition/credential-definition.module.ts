import { Module } from '@nestjs/common';
import { CredentialDefinitionController } from './credential-definition.controller';

@Module({
  controllers: [CredentialDefinitionController],
})
export class CredentialDefinitionModule {}
