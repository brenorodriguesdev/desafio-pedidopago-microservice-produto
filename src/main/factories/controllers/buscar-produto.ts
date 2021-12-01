import { BuscarProdutoService } from "../../../data/services/buscar-produto"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { BuscarProdutoController } from "../../../presentation/controllers/buscar-produto"
import { makeBuscarProdutoValidator } from "../validators/buscar-produto"

export const makeBuscarProdutoController = (): Controller => {
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const buscarProdutoService = new BuscarProdutoService(produtoRepository)
    return new BuscarProdutoController(makeBuscarProdutoValidator(), buscarProdutoService)
}