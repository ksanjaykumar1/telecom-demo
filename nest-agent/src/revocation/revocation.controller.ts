import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('revocation')
@Controller('revocation')
export class RevocationController {}
