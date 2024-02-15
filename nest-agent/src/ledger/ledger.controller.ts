import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ledger')
@Controller('ledger')
export class LedgerController {}
