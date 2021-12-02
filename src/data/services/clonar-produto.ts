import { ProdutoModel } from "../../domain/models/produto";
import { ClonarProdutoUseCase } from "../../domain/useCases/clonar-produto";
import { ProdutoIngredienteRepository } from "../contracts/produto-ingrediente-repository";
import { ProdutoRepository } from "../contracts/produto-repository";

export class ClonarProdutoService implements ClonarProdutoUseCase {
    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly produtoIngredienteRepository: ProdutoIngredienteRepository) { }
    async clonar(id: number): Promise<ProdutoModel | Error> {

        const produto = await this.produtoRepository.findById(id)
        if (!produto) {
            return new Error('Esse produto não foi encontrado!')
        }

        produto.id = 0
        const produtoClone = await this.produtoRepository.create(produto)

        let ingredientes = []
        console.log(produto.ingredientes)
        for (let produtoIngrediente of produto.ingredientes) {
            await this.produtoIngredienteRepository.create({
                ingrediente: produtoIngrediente.ingrediente,
                produto: produtoClone
            })
            ingredientes.push(produtoIngrediente.ingrediente)
        }

        return {
            id: produtoClone.id,
            thumbnail: produtoClone.thumbnail,
            nome: produtoClone.nome,
            preco: produtoClone.preco,
            ingredientes,
            disponibilidade: produtoClone.disponibilidade,
            volume: produtoClone.volume,
            outros: produtoClone.outros
        }
    }
}