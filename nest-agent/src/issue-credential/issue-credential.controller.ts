import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IssueCredentialService } from './issue-credential.service';
import { IssueCredentialDto } from './dto/issue-credential.dto/issue-credential.dto';

@ApiTags('issue-credential')
@Controller('issue-credential')
export class IssueCredentialController {
  constructor(
    private readonly issueCredentialService: IssueCredentialService,
  ) {}
  @Post('/create-and-send')
  offerAnoncredsCredential(@Body() issueCredentialDto: IssueCredentialDto) {
    return this.issueCredentialService.issueCredential(issueCredentialDto);
  }
}
