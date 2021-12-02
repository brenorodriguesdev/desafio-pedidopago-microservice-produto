export interface CriarProdutoModel {
    thumbnail: string
    nome: string
    preco: number
    ingredientes: number[]
    disponibilidade: number
    volume: number
    outros?: string
}