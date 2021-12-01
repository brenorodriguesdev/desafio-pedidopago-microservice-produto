export interface CriarProdutoModel {
    id?: number
    thumbnail: string
    nome: string
    preco: number
    ingredientes: number[]
    disponibilidade: number
    volume: number
    outros?: string
}

export interface CriarProdutosModel {
    produtos: CriarProdutoModel[]
}