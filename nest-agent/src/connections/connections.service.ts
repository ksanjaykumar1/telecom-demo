import { Agent } from '@aries-framework/core';
import { Inject, Injectable } from '@nestjs/common';
import { AGENT_TOKEN } from 'src/constants';
import * as qrcode from 'qrcode-terminal';
import { createNewInvitation } from 'src/agent/agentUtils';
import { CreateInvitationDto } from './dto/create-invitation.dto/create-invitation.dto';
import { SendMessageDto } from './dto/send-message.dto/send-message.dto';
import { ReceiveInvitationDto } from './dto/receive-invitation.dto/receive-invitation.dto';

@Injectable()
export class ConnectionsService {
  constructor(@Inject(AGENT_TOKEN) private agent: Agent) {}
  sendMessage(connectionId: string, { message }: SendMessageDto) {
    return this.agent.basicMessages.sendMessage(connectionId, message);
  }

  getAllConnections() {
    return this.agent.connections.getAll();
  }

  async createInvitation(createInvitationDto: CreateInvitationDto) {
    const { invitationUrl, outOfBandRecord } = await createNewInvitation(
      this.agent,
      createInvitationDto,
    );
    this.generateQrCode(invitationUrl);
    return {
      invitationUrl,
      outOfBandRecord,
    };
  }

  receiveInvitationUrl({ invitationUrl }: ReceiveInvitationDto) {
    return this.agent.oob.receiveInvitationFromUrl(invitationUrl);
  }

  private generateQrCode(invitationUrl) {
    qrcode.generate(invitationUrl, { small: true });
  }
}
