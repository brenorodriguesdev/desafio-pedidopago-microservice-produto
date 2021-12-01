import { CriarProdutosModel } from "../../domain/models/criar-produtos";
import { ProdutoModel } from "../../domain/models/produto";
import { CriarProdutosUseCase, CriarProdutoUseCase } from "../../domain/useCases/criar-produtos";
import { IngredienteRepository } from "../contracts/ingrediente-repository";

export class CriarProdutosService implements CriarProdutosUseCase {
    constructor(private readonly ingredienteRepository: IngredienteRepository, private readonly criarProdutoUseCase: CriarProdutoUseCase) { }
    async criar(data: CriarProdutosModel): Promise<ProdutoModel[] | Error> {

        let produtos = []

        for (let produto of data.produtos) {
            for (let idIngrediente of produto.ingredientes) {
                const ingrediente = await this.ingredienteRepository.findById(idIngrediente)
                if (!ingrediente) {
                    return new Error(`O com a id ${idIngrediente} ingrediente não existe`)
                }
            }

            const productModel = await this.criarProdutoUseCase.criar(produto)
            produtos.push(productModel)
        }

        return produtos
    }
}