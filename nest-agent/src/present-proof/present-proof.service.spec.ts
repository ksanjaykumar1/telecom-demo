import { Test, TestingModule } from '@nestjs/testing';
import { PresentProofService } from './present-proof.service';

describe('PresentProofService', () => {
  let service: PresentProofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentProofService],
    }).compile();

    service = module.get<PresentProofService>(PresentProofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
