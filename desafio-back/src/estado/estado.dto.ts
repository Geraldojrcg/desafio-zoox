import { IsString, IsNotEmpty, IsOptional, IsObject, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EstadoDto {
    @ApiProperty()
    @IsNotEmpty({ message: "nome não pode ser vazio" })
    @IsString({ message: "nome deve ser do tipo string" })
    nome: string;

    @ApiProperty()
    @IsNotEmpty({ message: "abreviacao não pode ser vazio" })
    @IsString({ message: "abreviacao deve ser do tipo string" })
    @Length(2, 2, { message: "abreviacao deve ter 2 caracteres" })
    abreviacao: string;

    dataCriacao: string;

    dataUltimaAlteracao: string;
}

export class AtualizarEstadoDto {
    @ApiProperty()
    @IsNotEmpty({ message: "nome não pode ser vazio" })
    @IsString({ message: "nome deve ser do tipo string" })
    nome: string;

    @ApiProperty()
    @IsNotEmpty({ message: "abreviacao não pode ser vazio" })
    @IsString({ message: "abreviacao deve ser do tipo string" })
    @Length(2, 2, { message: "abreviacao deve ter 2 caracteres" })
    abreviacao: string;
}

export class FiltroBuscaEstadoDto extends EstadoDto { }


export class OrdenacaoBuscaEstadoDto {
    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    nome: string;

    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    abreviacao: string;

    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    dataCriacao: string;

    @ApiProperty({ example: '1', description: '1 para ordenar os documentos em ordem crescente ou -1 para ordenar em ordem decrescente' })
    dataUltimaAlteracao: string;
}

export class BuscaAvancadaEstadoDto {
    @ApiProperty()
    @IsOptional()
    @IsObject()
    filtro: FiltroBuscaEstadoDto;

    @ApiProperty()
    @IsOptional()
    @IsObject()
    ordenacao: OrdenacaoBuscaEstadoDto;
}