import { CriarProdutoService } from "../../../data/services/criar-produto"
import { CriarProdutosService } from "../../../data/services/criar-produtos"
import { IngredienteRepositoryTypeORM } from "../../../infra/ingrediente-repository"
import { ProdutoIngredienteRepositoryORM } from "../../../infra/produto-ingrediente-repository"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { CriarProdutosController } from "../../../presentation/controllers/criar-produtos"
import { makeCriarProdutoValidator } from "../validators/criar-produto"

export const makCriarProdutosController = (): Controller => {
    const ingredienteRepository = new IngredienteRepositoryTypeORM()
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const produtoIngredienteRepository = new ProdutoIngredienteRepositoryORM()

    const criarProdutoService = new CriarProdutoService(ingredienteRepository, produtoRepository, produtoIngredienteRepository)
    const criarProdutosService = new CriarProdutosService(ingredienteRepository, criarProdutoService)

    return new CriarProdutosController(makeCriarProdutoValidator(), criarProdutosService)
}