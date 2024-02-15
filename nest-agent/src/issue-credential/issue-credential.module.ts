import { Module } from '@nestjs/common';
import { IssueCredentialController } from './issue-credential.controller';

@Module({
  controllers: [IssueCredentialController]
})
export class IssueCredentialModule {}
