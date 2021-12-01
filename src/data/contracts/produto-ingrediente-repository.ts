import { ProdutoIngrediente } from "../entities/produtoIngrediente";

export interface ProdutoIngredienteRepository {
    create: (produtoIngrediente: ProdutoIngrediente) => Promise<ProdutoIngrediente>
    deleteById: (id: number) => Promise<void>
}