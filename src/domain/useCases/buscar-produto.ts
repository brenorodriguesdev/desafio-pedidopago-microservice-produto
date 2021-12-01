import { ProdutoModel } from "../models/produto";

export interface BuscarProdutoUseCase {
    buscar: (id: number) => Promise<ProdutoModel | Error>
}