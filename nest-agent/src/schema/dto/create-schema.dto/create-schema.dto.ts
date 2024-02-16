import { IsOptional, IsString } from 'class-validator';

export class CreateSchemaDto {
  @IsString({ each: true })
  attrNames: string[];

  @IsOptional()
  @IsString()
  issuerId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  version: string;
}
