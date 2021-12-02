import { ClonarProdutoService } from "../../../data/services/clonar-produto"
import { CriarProdutoService } from "../../../data/services/criar-produto"
import { IngredienteRepositoryTypeORM } from "../../../infra/ingrediente-repository"
import { ProdutoIngredienteRepositoryORM } from "../../../infra/produto-ingrediente-repository"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { ClonarProdutoController } from "../../../presentation/controllers/clonar-produto"
import { makeClonarProdutoValidator } from "../validators/clonar-produto"

export const makClonarProdutoController = (): Controller => {
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const produtoIngredienteRepository = new ProdutoIngredienteRepositoryORM()
    const ingredienteRepository = new IngredienteRepositoryTypeORM()
    const criarProdutoService = new CriarProdutoService(ingredienteRepository, produtoRepository, produtoIngredienteRepository)
    const clonarProdutoService = new ClonarProdutoService(produtoRepository, criarProdutoService)
    return new ClonarProdutoController(makeClonarProdutoValidator(), clonarProdutoService)
}