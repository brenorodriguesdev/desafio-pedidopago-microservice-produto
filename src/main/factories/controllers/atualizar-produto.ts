import { AtualizarProdutoService } from "../../../data/services/atualizar-produto"
import { IngredienteRepositoryTypeORM } from "../../../infra/ingrediente-repository"
import { ProdutoIngredienteRepositoryORM } from "../../../infra/produto-ingrediente-repository"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { AtualizarProdutoController } from "../../../presentation/controllers/atualizar-produto"
import { makeAtualizarProdutoValidator } from "../validators/atualizar-produto"

export const makeAtualizarProdutoController = (): Controller => {
    const ingredienteRepository = new IngredienteRepositoryTypeORM()
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const produtoIngredienteRepository = new ProdutoIngredienteRepositoryORM()

    const atualizarProdutoService = new AtualizarProdutoService(ingredienteRepository, produtoRepository, produtoIngredienteRepository)
    return new AtualizarProdutoController(makeAtualizarProdutoValidator(), atualizarProdutoService)
}