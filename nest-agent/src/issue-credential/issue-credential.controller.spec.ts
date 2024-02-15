import { Test, TestingModule } from '@nestjs/testing';
import { IssueCredentialController } from './issue-credential.controller';

describe('IssueCredentialController', () => {
  let controller: IssueCredentialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueCredentialController],
    }).compile();

    controller = module.get<IssueCredentialController>(
      IssueCredentialController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
