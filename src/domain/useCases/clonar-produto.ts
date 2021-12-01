import { ProdutoModel } from "../models/produto";

export interface ClonarProdutoUseCase {
    clonar: (id: number) => Promise<ProdutoModel | Error>
}