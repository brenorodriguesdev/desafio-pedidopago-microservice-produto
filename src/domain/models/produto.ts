import { IngredienteModel } from "./ingrediente";

export interface ProdutoModel {
    id?: number
    thumbnail: string
    nome: string
    preco: number
    ingredientes: IngredienteModel[]
    disponibilidade: number
    volume: number
    outros?: string
}

export interface ProdutosModel {
    produtos: ProdutoModel[]
}