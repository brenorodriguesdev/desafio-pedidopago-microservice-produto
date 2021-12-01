import { AtualizarProdutoModel } from "../models/atualizar-produto";

export interface AtualizarProdutoUseCase {
    atualizar: (data: AtualizarProdutoModel) => Promise<void | Error>
}