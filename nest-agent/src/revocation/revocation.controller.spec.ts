import { Test, TestingModule } from '@nestjs/testing';
import { RevocationController } from './revocation.controller';

describe('RevocationController', () => {
  let controller: RevocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevocationController],
    }).compile();

    controller = module.get<RevocationController>(RevocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
