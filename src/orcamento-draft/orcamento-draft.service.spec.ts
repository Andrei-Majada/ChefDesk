import { Test, TestingModule } from '@nestjs/testing';
import { OrcamentoDraftService } from './orcamento-draft.service';

describe('OrcamentoDraftService', () => {
  let service: OrcamentoDraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrcamentoDraftService],
    }).compile();

    service = module.get<OrcamentoDraftService>(OrcamentoDraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
