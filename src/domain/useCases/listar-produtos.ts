import { ProdutosModel } from "../models/produto";

export interface ListarProdutosUseCase {
    listar: () => Promise<ProdutosModel>
}