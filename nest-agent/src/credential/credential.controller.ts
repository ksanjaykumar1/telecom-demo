import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CredentialService } from './credential.service';

@ApiTags('credentials')
@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}
  @Get('/:credential_id')
  getCredentialById(@Param('credential_id') credential_id: string) {
    return this.credentialService.getCredentialById(credential_id);
  }
}
