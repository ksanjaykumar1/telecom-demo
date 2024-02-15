import { Test, TestingModule } from '@nestjs/testing';
import { PresentProofController } from './present-proof.controller';

describe('PresentProofController', () => {
  let controller: PresentProofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentProofController],
    }).compile();

    controller = module.get<PresentProofController>(PresentProofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
