import { CriarProdutoService } from "../../../data/services/criar-produto"
import { IngredienteRepositoryTypeORM } from "../../../infra/ingrediente-repository"
import { ProdutoIngredienteRepositoryORM } from "../../../infra/produto-ingrediente-repository"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { CriarProdutoController } from "../../../presentation/controllers/criar-produto"
import { makeCriarProdutoValidator } from "../validators/criar-produto"

export const makCriarProdutoController = (): Controller => {
    const ingredienteRepository = new IngredienteRepositoryTypeORM()
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const produtoIngredienteRepository = new ProdutoIngredienteRepositoryORM()

    const criarProdutoService = new CriarProdutoService(ingredienteRepository, produtoRepository, produtoIngredienteRepository)
    return new CriarProdutoController(makeCriarProdutoValidator(), criarProdutoService)
}