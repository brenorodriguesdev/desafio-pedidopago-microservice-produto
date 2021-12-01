import { CriarProdutosModel } from "../models/criar-produtos";
import { ProdutoModel } from "../models/produto";

export interface CriarProdutosUseCase {
    criar: (data: CriarProdutosModel) => Promise<ProdutoModel[] | Error>
}