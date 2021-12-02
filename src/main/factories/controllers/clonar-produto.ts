import { ClonarProdutoService } from "../../../data/services/clonar-produto"
import { ProdutoIngredienteRepositoryORM } from "../../../infra/produto-ingrediente-repository"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { ClonarProdutoController } from "../../../presentation/controllers/clonar-produto"
import { makeClonarProdutoValidator } from "../validators/clonar-produto"

export const makClonarProdutoController = (): Controller => {
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const produtoIngredienteRepository = new ProdutoIngredienteRepositoryORM()

    const clonarProdutoService = new ClonarProdutoService(produtoRepository, produtoIngredienteRepository)
    return new ClonarProdutoController(makeClonarProdutoValidator(), clonarProdutoService)
}