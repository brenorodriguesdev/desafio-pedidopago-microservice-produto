import { DeletarProdutoService } from "../../../data/services/deletar-produto"
import { ProdutoRepositoryTypeORM } from "../../../infra/produto-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { DeletarProdutoController } from "../../../presentation/controllers/deletar-produto"
import { makeDeletarProdutoValidator } from "../validators/deletar-produto"

export const makeDeletarProdutoController = (): Controller => {
    const produtoRepository = new ProdutoRepositoryTypeORM()
    const deletarProdutoService = new DeletarProdutoService(produtoRepository)
    return new DeletarProdutoController(makeDeletarProdutoValidator(), deletarProdutoService)
}