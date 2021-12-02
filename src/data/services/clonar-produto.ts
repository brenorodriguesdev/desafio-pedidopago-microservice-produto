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

        const produtoClone = await this.produtoRepository.create(produto)

        let ingredientes = []
        for (let produtoIngrediente of produto.ingredientes) {
            const produtoIngredienteCriado = await this.produtoIngredienteRepository.create({
                ingrediente: produtoIngrediente.ingrediente,
                produto: produtoClone
            })
            console.log(produtoIngredienteCriado)
            ingredientes.push(produtoIngredienteCriado)
        }

        return {
            id: produtoClone.id,
            thumbnail: produtoClone.thumbnail,
            nome: produtoClone.nome,
            preco: produtoClone.preco,
            ingredientes: ingredientes.map(produtoIngrediente => ({
                id: produtoIngrediente.ingrediente.id,
                nome: produtoIngrediente.ingrediente.nome,
            })),
            disponibilidade: produtoClone.disponibilidade,
            volume: produtoClone.volume,
            outros: produtoClone.outros
        }
    }
}