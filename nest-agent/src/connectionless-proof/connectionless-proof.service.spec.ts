import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionlessProofService } from './connectionless-proof.service';

describe('ConnectionlessProofService', () => {
  let service: ConnectionlessProofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionlessProofService],
    }).compile();

    service = module.get<ConnectionlessProofService>(
      ConnectionlessProofService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
