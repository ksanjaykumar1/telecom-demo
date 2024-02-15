import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('connection')
@Controller('connections')
export class ConnectionsController {
  @Get()
  getAllConnections() {
    return 'all connections';
  }
}
