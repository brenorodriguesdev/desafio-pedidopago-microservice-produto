import { IngredienteModel } from "./ingrediente";

export interface ProdutoModel {
    id?: number
    thumbnail: string
    nome: string
    preco: string
    ingredientes: IngredienteModel[]
    disponibilidade: number
    volume: number
    outros?: string
}