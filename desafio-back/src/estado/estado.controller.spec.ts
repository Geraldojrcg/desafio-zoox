import { EstadoService } from './estado.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EstadoController } from './estado.controller';
import { getModelToken } from '@nestjs/mongoose';
import { EstadoDto } from './estado.dto';

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

describe('EstadoController', () => {
  let controller: EstadoController;
  let service: EstadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoController],
      providers: [
        EstadoService,
        {
          provide: getModelToken('Estado'),
          useValue: EstadoModel,
        },
      ]
    }).compile();

    controller = module.get<EstadoController>(EstadoController);
    service = module.get<EstadoService>(EstadoService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve listar todos os estados', async () => {
    expect(await controller.listar()).toBe([estado]);
  });

});
