import { CidadeService } from './cidade.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const cidade = {
  id: "123",
  nome: "Natawl",
  estadoId: "345",
  dataCriacao: "10-10-2020",
  dataUltimaAlteracao: "10-10-2020"
}

const cidadeEditada = {
  id: "123",
  nome: "Natal",
  estadoId: "345",
  dataCriacao: "11-10-2020",
  dataUltimaAlteracao: "11-10-2020"
}

class CidadeModel {
  static create = jest.fn().mockResolvedValue(cidade);
  static find = jest.fn().mockResolvedValue([cidade]);
  static findOne = jest.fn().mockResolvedValue(cidade);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(cidade);
  static findByIdAndRemove = jest.fn().mockResolvedValue(cidade);
  static populate = jest.fn().mockResolvedValue(cidade);
}

describe('CidadeService', () => {
  let service: CidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CidadeService,
        {
          provide: getModelToken('Cidade'),
          useValue: CidadeModel,
        },
      ]
    }).compile();

    service = module.get<CidadeService>(CidadeService);

  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve listar todos as cidades', async () => {
    expect(service.listar()).resolves.toEqual([cidade]);
  });

  it('deve listar uma cidade com base no id informado', () => {
    expect(service.buscarPorId("123")).resolves.toEqual(cidade);
  });

  it('deve criar uma cidade e retornar a cidade criado', () => {
    expect(service.criar(cidade)).resolves.toEqual(cidade);
  });

  it('deve editar uma cidade com base no id informado retornar a cidade editado', () => {
    expect(service.atualizar("123", cidade)).resolves.toEqual(cidadeEditada);
  });

  it('deve deletar uma cidade com base no id informado retornar a cidade deletado', () => {
    expect(service.deletar("123")).resolves.toEqual(cidadeEditada);
  });
});

