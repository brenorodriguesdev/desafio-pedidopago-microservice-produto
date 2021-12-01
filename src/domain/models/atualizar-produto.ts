export interface AtualizarProdutoModel {
    id?: number
    thumbnail: string
    nome: string
    preco: string
    ingredientes: number[]
    disponibilidade: number
    volume: number
    outros?: string
}