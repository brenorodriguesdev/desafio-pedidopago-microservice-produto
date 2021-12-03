import { Produto } from "../../../data/entities/produto"
import { makeProdutoIngrediente } from "./produtoIngrediente"

export const makeProduto = (id: number): Produto => {
    const produto = new Produto()
    produto.id = id
    produto.thumbnail = 'thumbnail ' + id
    produto.nome = 'nome ' + id
    produto.preco = id 
    produto.disponibilidade = id
    produto.volume = id
    produto.ingredientes = [makeProdutoIngrediente(1)]
    produto.outros = 'outros ' + id
    return produto
}

export const makeProdutoSemProdutoIngrediente = (id: number): Produto => {
    const produto = new Produto()
    produto.id = id
    produto.thumbnail = 'thumbnail ' + id
    produto.nome = 'nome ' + id
    produto.preco = id 
    produto.disponibilidade = id
    produto.volume = id
    produto.outros = 'outros ' + id
    return produto
}