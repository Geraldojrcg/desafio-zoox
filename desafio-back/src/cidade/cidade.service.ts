import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CidadeDto, BuscaAvancadaCidadeDto, AtualizarCidadeDto } from './cidade.dto';
import { ICidade } from './cidade.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class CidadeService {
    constructor(@InjectModel('Cidade') private cidadeModel: mongoose.Model<ICidade>) { }

    async criar(payload: CidadeDto): Promise<ICidade> {
        let cidade = await this.cidadeModel.create({ nome: payload.nome, estado: payload.estadoId });
        if (cidade) {
            cidade = await cidade.populate('estado').execPopulate();
        }
        return cidade;
    }

    async listar(): Promise<ICidade[]> {
        return await this.cidadeModel.find().populate("estado").exec();
    }

    async buscarPorId(id: string): Promise<ICidade> {
        return await this.cidadeModel.findOne({ _id: id }).populate('estado').exec();
    }

    async buscaAvancada(buscaDto: BuscaAvancadaCidadeDto): Promise<ICidade[]> {
        const busca = {};
        for (var key in buscaDto.filtro) {
            buscaDto.filtro[key] ? busca[key] = buscaDto.filtro[key] : undefined;
            if (key == "nome") busca[key] = { $regex: buscaDto.filtro[key], $options: "ig" }
        }
        let cidades = await this.cidadeModel
            .find(busca)
            .populate('estado')
            .sort(buscaDto.ordenacao)
            .exec();

        return cidades;
    }

    async deletar(id: string): Promise<ICidade> {
        return await this.cidadeModel.findByIdAndRemove(id);
    }

    async atualizar(id: string, payloadDto: AtualizarCidadeDto): Promise<ICidade> {
        const payload = {};
        for (var key in payloadDto) {
            payloadDto[key] ? payload[key] = payloadDto[key] : undefined;
            if (key == "estadoId") payload["estadoId"] = payloadDto.estadoId
        }
        return await this.cidadeModel
            .findByIdAndUpdate(id, payload, { new: true })
            .populate('estado')
            .exec();
    }
}
