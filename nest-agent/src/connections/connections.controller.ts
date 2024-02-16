import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConnectionsService } from './connections.service';
import { CreateInvitationDto } from './dto/create-invitation.dto/create-invitation.dto';
import { SendMessageDto } from './dto/send-message.dto/send-message.dto';
import { ReceiveInvitationDto } from './dto/receive-invitation.dto/receive-invitation.dto';

@ApiTags('connection')
@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}
  @Get()
  async getAllConnections() {
    return await this.connectionsService.getAllConnections();
  }
  @Post('create-invitation')
  async createInvitation(@Body() createInvitationDto: CreateInvitationDto) {
    return await this.connectionsService.createInvitation(createInvitationDto);
  }

  @Post('receive-invitation-url')
  async receiveInvitationUrl(
    @Body() receiveInvitationDto: ReceiveInvitationDto,
  ) {
    const { outOfBandRecord } =
      await this.connectionsService.receiveInvitationUrl(receiveInvitationDto);
    return outOfBandRecord;
  }

  @ApiTags('basicmessage')
  @Post('/:conn_id/send-message')
  async sendBasicMessage(
    @Param('conn_id') conn_id: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return await this.connectionsService.sendMessage(conn_id, sendMessageDto);
  }
}
