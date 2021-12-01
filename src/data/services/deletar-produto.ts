import { DeletarProdutoUseCase } from "../../domain/useCases/deletar-produto";
import { ProdutoRepository } from "../contracts/produto-repository";

export class DeletarProdutoService implements DeletarProdutoUseCase {
    constructor(private readonly produtoRepository: ProdutoRepository) { }
    async deletar(id: number): Promise<void | Error> {
        const produto = await this.produtoRepository.findById(id)
        if (!produto) {
            return new Error('Esse produto não foi encontrado!')
        }
        await this.produtoRepository.deleteById(id)
    }
}