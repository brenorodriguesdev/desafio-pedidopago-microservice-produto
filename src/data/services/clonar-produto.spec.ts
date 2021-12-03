import { ProdutoModel } from "../../domain/models/produto"
import { CriarProdutoUseCase } from "../../domain/useCases/criar-produtos"
import { makeProduto } from "../../tests/factories/entities/produto"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { ClonarProdutoService } from "./clonar-produto"

interface SutTypes {
    produtoRepository: ProdutoRepository,
    criarProdutoUseCase: CriarProdutoUseCase,
    sut: ClonarProdutoService
}

const makeCriarProdutoUseCase = (): CriarProdutoUseCase => {
    class CriarProdutoUseCaseStub implements CriarProdutoUseCase {
        async criar(): Promise<ProdutoModel | Error> {
            const produto = makeProduto(1)
            return new Promise(resolve => resolve({
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
            }))
        }
    }
    return new CriarProdutoUseCaseStub()
}

const makeSut = (): SutTypes => {
    const produtoRepository = makeProdutoRepository()
    const criarProdutoUseCase = makeCriarProdutoUseCase()
    const sut = new ClonarProdutoService(produtoRepository, criarProdutoUseCase)
    return {
        produtoRepository,
        criarProdutoUseCase,
        sut
    }
}

describe('ClonarProduto Service', () => {
    test('Garantir que produtoRepository findById seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const findByIdSpy = jest.spyOn(produtoRepository, 'findById')
        await sut.clonar(1)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o produtoRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.clonar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o produtoRepository findById retornar nullo retornar um error', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.clonar(1)
        expect(error).toEqual(new Error('Esse produto não foi encontrado!'))
    })

    test('Garantir que se o tudo ocorrer normalmente retornar o produto', async () => {
        const { sut } = makeSut()
        const produtoResponse = await sut.clonar(1)
        const produto = makeProduto(1)
        expect(produtoResponse).toEqual({
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
        })
    })

    test('Garantir que criarProdutoUseCase criar seja chamado com os valores corretos', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarProdutoUseCase, 'criar')
        await sut.clonar(1)
        const produto = makeProduto(1)
        expect(criarSpy).toHaveBeenCalledWith({
            thumbnail: produto.thumbnail,
            nome: produto.nome,
            preco: produto.preco,
            ingredientes: produto.ingredientes.map(produtoIngrediente => produtoIngrediente.ingrediente.id),
            disponibilidade: produto.disponibilidade,
            volume: produto.volume,
            outros: produto.outros,
        })
    })
    
    test('Garantir que se o criarProdutoUseCase criar retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        jest.spyOn(criarProdutoUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.clonar(1)
        await expect(promise).rejects.toThrow()
    })
})