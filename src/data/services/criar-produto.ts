import { CriarProdutoModel } from "../../domain/models/criar-produtos";
import { ProdutoModel } from "../../domain/models/produto";
import { CriarProdutoUseCase } from "../../domain/useCases/criar-produtos";
import { IngredienteRepository } from "../contracts/ingrediente-repository";
import { ProdutoIngredienteRepository } from "../contracts/produto-ingrediente-repository";
import { ProdutoRepository } from "../contracts/produto-repository";

export class CriarProdutoService implements CriarProdutoUseCase {
    constructor(private readonly ingredienteRepository: IngredienteRepository,
        private readonly produtoRepository: ProdutoRepository,
        private readonly produtoIngredienteRepository: ProdutoIngredienteRepository) { }
    async criar(data: CriarProdutoModel): Promise<ProdutoModel | Error> {

        let ingredientes = []

        for (let idIngrediente of data.ingredientes) {
            const ingrediente = await this.ingredienteRepository.findById(idIngrediente)
            if (!ingrediente) {
                return new Error(`O com a id ${idIngrediente} ingrediente não existe`)
            }
            ingredientes.push(ingrediente)
        }

        const produto = await this.produtoRepository.create({
            thumbnail: data.thumbnail,
            nome: data.nome,
            preco: data.preco,
            ingredientes: [],
            disponibilidade: data.disponibilidade,
            volume: data.volume,
            outros: data.outros
        })
        
        for (let ingrediente of ingredientes) {
            await this.produtoIngredienteRepository.create({
                ingrediente,
                produto
            })
        }


        return {
            id: produto.id,
            thumbnail: produto.thumbnail,
            nome: produto.nome,
            preco: produto.preco,
            ingredientes: ingredientes,
            disponibilidade: produto.disponibilidade,
            volume: produto.volume,
            outros: produto.outros
        }
    }
}