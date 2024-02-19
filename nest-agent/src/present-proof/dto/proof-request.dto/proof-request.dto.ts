import { IsString } from 'class-validator';

export class ProofRequestDto {
  @IsString()
  connectionId: string;
  @IsString()
  credentialDefinitionId: string;
  @IsString({ each: true })
  requested_attributes: string[];
}
