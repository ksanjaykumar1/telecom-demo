import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('credentials')
@Controller('credentials')
export class CredentialsController {}
