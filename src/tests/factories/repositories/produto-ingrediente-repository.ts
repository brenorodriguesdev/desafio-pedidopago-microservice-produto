import { ProdutoIngredienteRepository } from "../../../data/contracts/produto-ingrediente-repository"
import { ProdutoIngrediente } from "../../../data/entities/produtoIngrediente"
import { makeProdutoIngrediente } from "../entities/produtoIngrediente"

export const makeProdutoIngredienteRepository = (): ProdutoIngredienteRepository => {
    class ProdutoIngredienteRepositoryStub implements ProdutoIngredienteRepository {
        async deleteById(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async create(): Promise<ProdutoIngrediente> {
            return new Promise(resolve => resolve(makeProdutoIngrediente(1)))
        }
    }
    return new ProdutoIngredienteRepositoryStub()
}