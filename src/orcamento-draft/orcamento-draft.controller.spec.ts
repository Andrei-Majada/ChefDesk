import { Test, TestingModule } from '@nestjs/testing';
import { OrcamentoDraftsController } from './orcamento-draft.controller';
import { OrcamentoDraftsService } from './orcamento-draft.service';

describe('OrcamentoDraftsController', () => {
  let controller: OrcamentoDraftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrcamentoDraftsController],
      providers: [
        {
          provide: OrcamentoDraftsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<OrcamentoDraftsController>(
      OrcamentoDraftsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
