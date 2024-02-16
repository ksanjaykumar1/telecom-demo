import { CreateOutOfBandInvitationConfig } from '@aries-framework/core';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto implements CreateOutOfBandInvitationConfig {
  @IsOptional()
  @IsString()
  label: string;
  @IsOptional()
  @IsString()
  alias: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
  @IsOptional()
  @IsBoolean()
  multiUseInvitation: boolean;
  @IsOptional()
  @IsBoolean()
  autoAcceptConnection: boolean;
}
