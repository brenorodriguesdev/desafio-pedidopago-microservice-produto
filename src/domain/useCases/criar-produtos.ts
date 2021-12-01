import { CriarProdutosModel, CriarProdutoModel } from "../models/criar-produtos";
import { ProdutoModel } from "../models/produto";

export interface CriarProdutosUseCase {
    criar: (data: CriarProdutosModel) => Promise<ProdutoModel[] | Error>
}

export interface CriarProdutoUseCase {
    criar: (data: CriarProdutoModel) => Promise<ProdutoModel | Error>
}