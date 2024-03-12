import { IsString } from 'class-validator';

export class ConnectionlessProofDto {
  @IsString()
  credentialDefinitionId: string;
  @IsString({ each: true })
  requested_attributes: string[];
}
