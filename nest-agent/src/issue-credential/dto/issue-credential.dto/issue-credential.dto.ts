import { IsArray, IsString, ValidateNested } from 'class-validator';

class Attribute {
  name: string;
  value: any; // or you can specify more specific types depending on possible values
}
export class IssueCredentialDto {
  @IsString()
  connectionId: string;

  @IsString()
  credentialDefinitionId: string;

  @IsArray()
  @ValidateNested({ each: true })
  attributes: Attribute[];
}
