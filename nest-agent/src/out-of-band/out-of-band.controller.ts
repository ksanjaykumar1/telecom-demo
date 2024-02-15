import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('out-of-band')
@Controller('out-of-band')
export class OutOfBandController {}
