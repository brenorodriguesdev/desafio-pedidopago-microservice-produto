import { ProdutoRepository } from "../../../data/contracts/produto-repository"
import { Produto } from "../../../data/entities/produto"
import { makeProduto } from "../entities/produto"

export const makeProdutoRepository = (): ProdutoRepository => {
    class ProdutoRepositoryStub implements ProdutoRepository {
        async deleteById(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async update(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async findById(): Promise<Produto> {
            return new Promise(resolve => resolve(makeProduto(1)))
        }

        async findAll(): Promise<Produto[]> {
            return new Promise(resolve => resolve([makeProduto(1), makeProduto(2)]))
        }

        async create(): Promise<Produto> {
            return new Promise(resolve => resolve(makeProduto(1)))
        }
    }
    return new ProdutoRepositoryStub()
}