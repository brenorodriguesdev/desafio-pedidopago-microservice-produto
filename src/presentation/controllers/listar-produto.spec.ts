import { ProdutosModel } from "../../domain/models/produto"
import { ListarProdutosUseCase } from "../../domain/useCases/listar-produtos"
import { makeProduto } from "../../tests/factories/entities/produto"
import { ListarProdutosController } from "./listar-produtos"

interface SutTypes {
    listarProdutosUseCase: ListarProdutosUseCase,
    sut: ListarProdutosController
}

const makeProdutosModel = (): ProdutosModel => {
    const produto = makeProduto(1)
    return {
        produtos: [{
            id: produto.id,
            thumbnail: produto.thumbnail,
            nome: produto.nome,
            preco: produto.preco,
            ingredientes: produto.ingredientes.map(produtoIngrediente => ({
                id: produtoIngrediente.ingrediente.id,
                nome: produtoIngrediente.ingrediente.nome
            })),
            disponibilidade: produto.disponibilidade,
            volume: produto.volume,
            outros: produto.outros
        }]
    }
}

const makeListarProdutosUseCase = (): ListarProdutosUseCase => {
    class ListarProdutosUseCaseStub implements ListarProdutosUseCase {
        async listar(): Promise<ProdutosModel> {
            return new Promise(resolve => resolve(makeProdutosModel()))
        }
    }
    return new ListarProdutosUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarProdutosUseCase = makeListarProdutosUseCase()
    const sut = new ListarProdutosController(listarProdutosUseCase)
    return {
        listarProdutosUseCase,
        sut
    }
}

describe('ListarProdutos controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarProdutosUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        jest.spyOn(listarProdutosUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se tudo ocorrer normalmente retornar produtos', async () => {
        const { sut } = makeSut()
        const produtos = await sut.handle()
        expect(produtos).toEqual(makeProdutosModel())
    })

})