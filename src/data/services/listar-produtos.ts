import { ProdutoModel } from "../../domain/models/produto";
import { ListarProdutosUseCase } from "../../domain/useCases/listar-produtos";
import { ProdutoRepository } from "../contracts/produto-repository";

export class ListarProdutosService implements ListarProdutosUseCase {
    constructor(private readonly produtoRepository: ProdutoRepository) { }
    async listar(): Promise<ProdutoModel[]> {
        const produtos = await this.produtoRepository.findAll()
    
        return produtos.map(produto => ({
            id: produto.id,
            thumbnail: produto.thumbnail,
            nome: produto.nome,
            preco: produto.preco,
            ingredientes: produto.ingredientes.map(ingrediente => ({
                id: ingrediente.ingrediente.id,
                nome: ingrediente.ingrediente.nome
            })),
            disponibilidade: produto.disponibilidade,
            volume: produto.volume,
            outros: produto.outros,
        }))
    }
}