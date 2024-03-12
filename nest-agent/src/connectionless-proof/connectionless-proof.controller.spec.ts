import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionlessProofController } from './connectionless-proof.controller';

describe('ConnectionlessProofController', () => {
  let controller: ConnectionlessProofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionlessProofController],
    }).compile();

    controller = module.get<ConnectionlessProofController>(
      ConnectionlessProofController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
