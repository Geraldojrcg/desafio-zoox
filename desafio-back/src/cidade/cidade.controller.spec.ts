import { CidadeService } from './cidade.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CidadeController } from './cidade.controller';
import { getModelToken } from '@nestjs/mongoose';

const cidade = {
  id: "123",
  nome: "Rio",
  estado: "345",
  dataCriacao: "10-10-2020",
  dataUltimaAlteracao: "10-10-2020"
}

class CidadeModel {
  static create = jest.fn().mockResolvedValue(cidade);
  static find = jest.fn().mockResolvedValue([cidade]);
  static findOne = jest.fn().mockResolvedValue(cidade);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(cidade);
  static findByIdAndRemove = jest.fn().mockResolvedValue(cidade);
}

describe('CidadeController', () => {
  let controller: CidadeController;
  let service: CidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CidadeController],
      providers: [
        CidadeService,
        {
          provide: getModelToken('Cidade'),
          useValue: CidadeModel,
        },
      ]
    }).compile();

    controller = module.get<CidadeController>(CidadeController);
    service = module.get<CidadeService>(CidadeService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });
});
