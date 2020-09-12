import { IsNotEmpty, IsString, IsMongoId, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CidadeDto {
    @ApiProperty()
    @IsNotEmpty({ message: "nome não pode ser vazio" })
    @IsString({ message: "nome deve ser do tipo string" })
    nome: string;

    @ApiProperty()
    @IsNotEmpty({ message: "estadoId não pode ser vazio" })
    @IsMongoId({ message: "estadoId deve ser do tipo Mongo Id" })
    estadoId: string;

    @ApiProperty()
    dataCriacao: string;

    @ApiProperty()
    dataUltimaAlteracao: string;
}

export class AtualizarCidadeDto {
    @ApiProperty()
    @IsOptional()
    @IsString({ message: "nome deve ser do tipo string" })
    nome: string;

    @ApiProperty()
    @IsOptional()
    @IsMongoId({ message: "estadoId deve ser do tipo Mongo Id" })
    estadoId: string;

    @ApiProperty()
    dataCriacao: string;

    @ApiProperty()
    dataUltimaAlteracao: string;
}

export class FiltroBuscaCidadeDto extends AtualizarCidadeDto { }

export class OrdenacaoBuscaCidadeDto {
    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    nome: string;

    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    estadoId: string;

    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    dataCriacao: string;

    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    dataUltimaAlteracao: string;
}

export class BuscaAvancadaCidadeDto {
    @ApiProperty()
    @IsOptional()
    @IsObject()
    filtro: FiltroBuscaCidadeDto;

    @ApiProperty()
    @IsOptional()
    @IsObject()
    ordenacao: OrdenacaoBuscaCidadeDto;
}