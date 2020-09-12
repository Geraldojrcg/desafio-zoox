import { EstadoDto, BuscaAvancadaEstadoDto, AtualizarEstadoDto } from './estado.dto';
import { EstadoService } from './estado.service';
import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { IEstado } from './estado.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estado')
@Controller('estado')
export class EstadoController {

    constructor(private readonly estadoService: EstadoService) { }

    @Get()
    async listar(): Promise<IEstado[]> {
        return await this.estadoService.listar();
    }

    @Get(":id")
    async buscarPorId(@Param('id') id: string): Promise<IEstado> {
        return await this.estadoService.buscarPorId(id);
    }

    @Post("/busca")
    @HttpCode(200)
    async buscarAvancada(@Body() busca: BuscaAvancadaEstadoDto): Promise<IEstado[]> {
        return await this.estadoService.buscaAvancada(busca);
    }

    @Post()
    async criar(@Body() payload: EstadoDto): Promise<IEstado> {
        return await this.estadoService.criar(payload);
    }

    @Put(':id')
    async atualizar(@Param('id') id: string, @Body() payload: AtualizarEstadoDto): Promise<IEstado> {
        return await this.estadoService.atualizar(id, payload);
    }

    @Delete(':id')
    async deletar(@Param('id') id: string): Promise<IEstado> {
        return await this.estadoService.deletar(id);
    }

}
