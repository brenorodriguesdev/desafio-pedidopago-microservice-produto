import { ProdutoModel } from "../../domain/models/produto";
import { ClonarProdutoUseCase } from "../../domain/useCases/clonar-produto";
import { CriarProdutoUseCase } from "../../domain/useCases/criar-produtos";
import { ProdutoRepository } from "../contracts/produto-repository";

export class ClonarProdutoService implements ClonarProdutoUseCase {
    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly criarProdutoUseCase: CriarProdutoUseCase) { }
    async clonar(id: number): Promise<ProdutoModel | Error> {

        const produto = await this.produtoRepository.findById(id)
        if (!produto) {
            return new Error('Esse produto não foi encontrado!')
        }

        let ingredientes = []
        for (let produtoIngrediente of produto.ingredientes) {
            ingredientes.push(produtoIngrediente.ingrediente.id)
        }

        return await this.criarProdutoUseCase.criar({
            thumbnail: produto.thumbnail,
            nome: produto.nome,
            preco: produto.preco,
            ingredientes: produto.ingredientes.map(produtoIngrediente => produtoIngrediente.ingrediente.id),
            disponibilidade: produto.disponibilidade,
            volume: produto.volume,
            outros: produto.outros,
        })
    }
}