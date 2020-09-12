import { CidadeDto, BuscaAvancadaCidadeDto, AtualizarCidadeDto } from './cidade.dto';
import { ICidade } from './cidade.interface';
import { CidadeService } from './cidade.service';
import { Controller, Param, Get, Put, Post, Body, Delete, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cidade')
@Controller('cidade')
export class CidadeController {

    constructor(private readonly cidadeService: CidadeService) { }

    @Get()
    async listar(): Promise<ICidade[]> {
        return await this.cidadeService.listar();
    }

    @Get(":id")
    async buscarPorId(@Param('id') id: string): Promise<ICidade> {
        return await this.cidadeService.buscarPorId(id);
    }

    @Post("/busca")
    @HttpCode(200)
    async buscarAvancada(@Body() busca: BuscaAvancadaCidadeDto): Promise<ICidade[]> {
        return await this.cidadeService.buscaAvancada(busca);
    }

    @Post()
    async criar(@Body() payload: CidadeDto): Promise<ICidade> {
        return await this.cidadeService.criar(payload);
    }

    @Put(':id')
    async atualizar(@Param('id') id: string, @Body() payload: AtualizarCidadeDto): Promise<ICidade> {
        return await this.cidadeService.atualizar(id, payload);
    }

    @Delete(':id')
    async deletar(@Param('id') id: string): Promise<ICidade> {
        return await this.cidadeService.deletar(id);
    }
}
