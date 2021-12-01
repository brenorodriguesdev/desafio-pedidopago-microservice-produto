import { Produto } from "../entities/produto";

export interface ProdutoRepository {
    create: (produto: Produto) => Promise<Produto>
    update: (produto: Produto) => Promise<void>
    findAll: () => Promise<Produto[]>
    findById: (id: number) => Promise<Produto>
    deleteById: (id: number) => Promise<void>
}