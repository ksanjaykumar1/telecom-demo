import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SchemaService } from './schema.service';
import { CreateSchemaDto } from './dto/create-schema.dto/create-schema.dto';

@ApiTags('schema')
@Controller('schemas')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Get('/:schema_id')
  getSchemaById(@Param('schema_id') schema_id: string) {
    return this.schemaService.getSchemaById(schema_id);
  }

  @Post('/')
  createAndRegisterSchema(@Body() createSchemaDto: CreateSchemaDto) {
    return this.schemaService.createSchema(createSchemaDto);
  }
}
