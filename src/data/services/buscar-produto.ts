import { ProdutoModel } from "../../domain/models/produto";
import { BuscarProdutoUseCase } from "../../domain/useCases/buscar-produto";
import { ProdutoRepository } from "../contracts/produto-repository";

export class BuscarProdutoService implements BuscarProdutoUseCase {
    constructor(private readonly produtoRepository: ProdutoRepository) { }
    async buscar(id: number): Promise<ProdutoModel | Error> {

        const produto = await this.produtoRepository.findById(id)
        if (!produto) {
            return new Error('Esse produto não foi encontrado!')
        }

        return {
            id: produto.id,
            thumbnail: produto.thumbnail,
            nome: produto.nome,
            preco: produto.preco,
            ingredientes: produto.ingredientes.map(produtoIngrediente => ({
                id: produtoIngrediente.ingrediente.id,
                nome: produtoIngrediente.ingrediente.nome
            })),
            disponibilidade: produto.disponibilidade,
            volume: produto.volume,
            outros: produto.outros
        }
    }
}