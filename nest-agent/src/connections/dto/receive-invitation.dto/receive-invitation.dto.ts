import { IsString } from 'class-validator';

export class ReceiveInvitationDto {
  @IsString()
  invitationUrl: string;
}
