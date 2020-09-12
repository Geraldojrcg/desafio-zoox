import { Document } from "mongoose";

export interface IEstadoBase {
    readonly nome: string,
    readonly abreviacao: string,
    readonly dataCriacao: string,
    readonly dataUltimaAlteracao: string
}

export interface IEstado extends IEstadoBase, Document { }