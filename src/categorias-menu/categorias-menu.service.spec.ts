import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasMenuService } from './categorias-menu.service';

describe('CategoriasMenuService', () => {
  let service: CategoriasMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriasMenuService],
    }).compile();

    service = module.get<CategoriasMenuService>(CategoriasMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
