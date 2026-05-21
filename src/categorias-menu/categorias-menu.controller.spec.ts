import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasMenuController } from './categorias-menu.controller';

describe('CategoriasMenuController', () => {
  let controller: CategoriasMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasMenuController],
    }).compile();

    controller = module.get<CategoriasMenuController>(CategoriasMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
