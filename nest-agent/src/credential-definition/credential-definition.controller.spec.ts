import { Test, TestingModule } from '@nestjs/testing';
import { CredentialDefinitionController } from './credential-definition.controller';

describe('CredentialDefinitionController', () => {
  let controller: CredentialDefinitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CredentialDefinitionController],
    }).compile();

    controller = module.get<CredentialDefinitionController>(CredentialDefinitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
