import { Document } from "mongoose";

export interface ICidadeBase {
    readonly nome: string,
    readonly estado: string,
    readonly dataCriacao: string,
    readonly dataUltimaAlteracao: string
}

export interface ICidade extends ICidadeBase, Document {}
