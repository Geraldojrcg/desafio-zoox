import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EstadoDto, BuscaAvancadaEstadoDto, AtualizarEstadoDto } from './estado.dto';
import { IEstado } from './estado.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class EstadoService {

    constructor(@InjectModel('Estado') private estadoModel: mongoose.Model<IEstado>) { }

    async criar(payload: EstadoDto): Promise<IEstado> {
        return await this.estadoModel.create(payload);
    }

    async listar(): Promise<IEstado[]> {
        return await this.estadoModel.find();
    }

    async buscarPorId(id: string): Promise<IEstado> {
        return await this.estadoModel.findOne({ _id: id });
    }

    async buscaAvancada(busca: BuscaAvancadaEstadoDto): Promise<IEstado[]> {
        const estados = await this.estadoModel
            .find(busca.filtro)
            .sort(busca.ordenacao)
        return estados;
    }

    async deletar(id: string): Promise<IEstado> {
        return await this.estadoModel.findByIdAndDelete(id);
    }

    async atualizar(id: string, payload: AtualizarEstadoDto): Promise<IEstado> {
        return await this.estadoModel.findByIdAndUpdate(id, payload, { new: true });
    }

}
