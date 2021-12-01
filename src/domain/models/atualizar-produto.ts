export interface AtualizarProdutoModel {
    id: number
    thumbnail: string
    nome: string
    preco: number
    ingredientes: number[]
    disponibilidade: number
    volume: number
    outros?: string
}