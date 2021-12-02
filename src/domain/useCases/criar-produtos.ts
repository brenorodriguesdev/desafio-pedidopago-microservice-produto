import { CriarProdutoModel } from "../models/criar-produtos";
import { ProdutoModel, ProdutosModel } from "../models/produto";

export interface CriarProdutosUseCase {
    criar: (data: CriarProdutoModel[]) => Promise<ProdutosModel | Error>
}

export interface CriarProdutoUseCase {
    criar: (data: CriarProdutoModel) => Promise<ProdutoModel | Error>
}