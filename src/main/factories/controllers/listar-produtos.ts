import { ListarProdutosService } from "../../../data/services/listar-produtos"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { ListarProdutosController } from "../../../presentation/controllers/listar-produtos"

export const makeListaProdutosController = (): Controller => {
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const listarProdutosService = new ListarProdutosService(produtoRepository)
    return new ListarProdutosController(listarProdutosService)
}