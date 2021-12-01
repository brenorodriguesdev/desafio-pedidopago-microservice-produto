import { AtualizarProdutoModel } from "../../domain/models/atualizar-produto";
import { AtualizarProdutoUseCase } from "../../domain/useCases/atualizar-produto";
import { IngredienteRepository } from "../contracts/ingrediente-repository";
import { ProdutoIngredienteRepository } from "../contracts/produto-ingrediente-repository";
import { ProdutoRepository } from "../contracts/produto-repository";

export class AtualizarProdutoService implements AtualizarProdutoUseCase {
    constructor(private readonly ingredienteRepository: IngredienteRepository,
        private readonly produtoRepository: ProdutoRepository,
        private readonly produtoIngredienteRepository: ProdutoIngredienteRepository) { }
    async atualizar(data: AtualizarProdutoModel): Promise<void | Error> {

        let ingredientes = []

        for (let idIngrediente of data.ingredientes) {
            const ingrediente = await this.ingredienteRepository.findById(idIngrediente)
            if (!ingrediente) {
                return new Error(`O com a id ${idIngrediente} ingrediente não existe`)
            }
            ingredientes.push(ingrediente)
        }

        const produto = await this.produtoRepository.findById(data.id)

        await this.produtoRepository.update({
            id: data.id,
            thumbnail: data.thumbnail,
            nome: data.nome,
            preco: data.preco,
            ingredientes: [],
            disponibilidade: data.disponibilidade,
            volume: data.volume,
            outros: data.outros
        })

        for (let produtoIngrediente of produto.ingredientes) {
            await this.produtoIngredienteRepository.deleteById(produtoIngrediente.id)
        }

        for (let ingrediente of ingredientes) {
            this.produtoIngredienteRepository.create({
                ingrediente,
                produto
            })
        }
    }
}