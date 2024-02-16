import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CredentialDefinitionService } from './credential-definition.service';
import { CreateCredentialDefinitionDto } from './dto/create-credential-definition.dto/create-credential-definition.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('credential-definition')
@Controller('credential-definitions')
export class CredentialDefinitionController {
  constructor(
    private readonly credentialDefinitionService: CredentialDefinitionService,
  ) {}

  @Get('/:cred_def_id')
  getSchemaById(@Param('cred_def_id') cred_def_id: string) {
    return this.credentialDefinitionService.getCredentialDefinitionById(
      cred_def_id,
    );
  }

  @Post('/')
  createAndRegisterSchema(
    @Body() createCredentialDefinitionDto: CreateCredentialDefinitionDto,
  ) {
    return this.credentialDefinitionService.createAndRegisterCredentialDefinition(
      createCredentialDefinitionDto,
    );
  }
}
