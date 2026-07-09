import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrcamentoDraft } from './schemas/orcamento-draft.schema';
import { OrcamentoDraftsService } from './orcamento-draft.service';
import { OrcamentosService } from '../orcamentos/orcamentos.service';
import { LeadsService } from '../leads/leads.service';

describe('OrcamentoDraftsService', () => {
  let service: OrcamentoDraftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrcamentoDraftsService,
        {
          provide: getModelToken(OrcamentoDraft.name),
          useValue: {},
        },
        {
          provide: OrcamentosService,
          useValue: {},
        },
        {
          provide: LeadsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrcamentoDraftsService>(OrcamentoDraftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
