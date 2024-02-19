import { Test, TestingModule } from '@nestjs/testing';
import { IssueCredentialService } from './issue-credential.service';

describe('IssueCredentialService', () => {
  let service: IssueCredentialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueCredentialService],
    }).compile();

    service = module.get<IssueCredentialService>(IssueCredentialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
