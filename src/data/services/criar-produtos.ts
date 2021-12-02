import { CriarProdutoModel } from "../../domain/models/criar-produtos";
import { ProdutosModel } from "../../domain/models/produto";
import { CriarProdutosUseCase, CriarProdutoUseCase } from "../../domain/useCases/criar-produtos";
import { IngredienteRepository } from "../contracts/ingrediente-repository";

export class CriarProdutosService implements CriarProdutosUseCase {
    constructor(private readonly ingredienteRepository: IngredienteRepository, private readonly criarProdutoUseCase: CriarProdutoUseCase) { }
    async criar(data: CriarProdutoModel[]): Promise<ProdutosModel | Error> {

        let produtos = []

        for (let produto of data) {
            for (let idIngrediente of produto.ingredientes) {
                const ingrediente = await this.ingredienteRepository.findById(idIngrediente)
                if (!ingrediente) {
                    return new Error(`O com a id ${idIngrediente} ingrediente não existe`)
                }
            }

            const productModel = await this.criarProdutoUseCase.criar(produto)
            produtos.push(productModel)
        }

        return { produtos }
    }
}