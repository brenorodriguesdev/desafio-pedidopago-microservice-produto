import { ProdutoModel } from "../models/produto";

export interface ListarProdutosUseCase {
    listar: () => Promise<ProdutoModel[]>
}