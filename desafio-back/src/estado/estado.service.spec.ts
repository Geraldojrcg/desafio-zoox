import { Test, TestingModule } from '@nestjs/testing';
import { EstadoService } from './estado.service';
import { getModelToken } from '@nestjs/mongoose';

const estado = {
  id: "123",
  nome: "Rio",
  abreviacao: "RN",
  dataCriacao: "10-10-2020",
  dataUltimaAlteracao: "10-10-2020"
}

const estadoEditado = {
  id: "123",
  nome: "Rio Grande do Norte",
  abreviacao: "RN",
  dataCriacao: "11-10-2020",
  dataUltimaAlteracao: "11-10-2020"
}

class EstadoModel {
  static create = jest.fn().mockResolvedValue(estado);
  static find = jest.fn().mockResolvedValue([estado]);
  static findOne = jest.fn().mockResolvedValue(estado);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(estado);
  static findByIdAndRemove = jest.fn().mockResolvedValue(estado);
}

describe('EstadoService', () => {
  let service: EstadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstadoService,
        {
          provide: getModelToken('Estado'),
          useValue: EstadoModel,
        },
      ],
    }).compile();

    service = module.get<EstadoService>(EstadoService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve listar todos os estados', async () => {
    expect(service.listar()).resolves.toEqual([estado]);
  });

  it('deve listar um estado com base no id informado', () => {
    expect(service.buscarPorId("123")).resolves.toEqual(estado);
  });

  it('deve criar um estado e retornar o estado criado', () => {
    expect(service.criar(estado)).resolves.toEqual(estado);
  });

  it('deve editar um estado com base no id informado retornar o estado editado', () => {
    expect(service.atualizar("123", estado)).resolves.toEqual(estadoEditado);
  });

  it('deve deletar um estado com base no id informado retornar o estado deletado', () => {
    expect(service.deletar("123")).resolves.toEqual(estadoEditado);
  });
});
