import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('issue-credential')
@Controller('issue-credential')
export class IssueCredentialController {}
