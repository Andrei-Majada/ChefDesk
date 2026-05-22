import { Test, TestingModule } from '@nestjs/testing';
import { OrcamentoDraftController } from './orcamento-draft.controller';
import { OrcamentoDraftService } from './orcamento-draft.service';

describe('OrcamentoDraftController', () => {
  let controller: OrcamentoDraftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrcamentoDraftController],
      providers: [OrcamentoDraftService],
    }).compile();

    controller = module.get<OrcamentoDraftController>(OrcamentoDraftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
