import { IsOptional, IsString } from 'class-validator';

export class CreateCredentialDefinitionDto {
  @IsOptional()
  @IsString()
  tag: string;

  @IsOptional()
  @IsString()
  issuerId: string;

  @IsString()
  schemaId: string;
}
