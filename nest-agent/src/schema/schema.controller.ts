import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('schema')
@Controller('schema')
export class SchemaController {}
