import { ProdutoIngrediente } from "../../../data/entities/produtoIngrediente"
import { makeIngrediente } from "./ingrediente"
import { makeProdutoSemProdutoIngrediente } from "./produto"

export const makeProdutoIngrediente = (id: number): ProdutoIngrediente => {
    const produtoIngrediente = new ProdutoIngrediente()
    produtoIngrediente.id = id
    produtoIngrediente.ingrediente = makeIngrediente(1)
    produtoIngrediente.produto = makeProdutoSemProdutoIngrediente(1)
    return produtoIngrediente
}