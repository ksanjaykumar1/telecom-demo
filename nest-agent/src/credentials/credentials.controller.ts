import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsService } from './credentials.service';

@ApiTags('credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}
  @Get()
  getAllCredentials() {
    return this.credentialsService.getAllCredentials();
  }
}
