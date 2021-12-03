import { makeProduto } from "../../tests/factories/entities/produto"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { ListarProdutosService } from "./listar-produtos"

interface SutTypes {
    produtoRepository: ProdutoRepository,
    sut: ListarProdutosService
}


const makeSut = (): SutTypes => {
    const produtoRepository = makeProdutoRepository()
    const sut = new ListarProdutosService(produtoRepository)
    return {
        produtoRepository,
        sut
    }
}

describe('ListarProdutos Service', () => {
    test('Garantir que produtoRepository findAll seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const findAllSpy = jest.spyOn(produtoRepository, 'findAll')
        await sut.listar()
        expect(findAllSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o produtoRepository findAll retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'findAll').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar produtos', async () => {
        const { sut } = makeSut()
        const produtosResponse = await sut.listar()
        const produtos = [makeProduto(1), makeProduto(2)]
        expect(produtosResponse).toEqual({
            produtos: produtos.map(produto => ({
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
        })
    })
})