import { ListarProdutosUseCase } from "../../domain/useCases/listar-produtos";
import { Controller } from "../contracts/controller";

export class ListarProdutoController implements Controller {
    constructor (private readonly listarProdutoUseCase: ListarProdutosUseCase) {}
    async handle(): Promise<any> {
        const produtos = await this.listarProdutoUseCase.listar()
        return produtos
    }
}