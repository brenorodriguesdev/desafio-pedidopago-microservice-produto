import { CriarProdutoModel } from "../../domain/models/criar-produtos"
import { ProdutoModel } from "../../domain/models/produto"
import { CriarProdutoUseCase } from "../../domain/useCases/criar-produtos"
import { makeProduto } from "../../tests/factories/entities/produto"
import { makeIngredienteRepository } from "../../tests/factories/repositories/ingrediente-repository"
import { IngredienteRepository } from "../contracts/ingrediente-repository"
import { CriarProdutosService } from "./criar-produtos"

interface SutTypes {
    ingredienteRepository: IngredienteRepository,
    criarProdutoUseCase: CriarProdutoUseCase,
    sut: CriarProdutosService
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
    const ingredienteRepository = makeIngredienteRepository()
    const criarProdutoUseCase = makeCriarProdutoUseCase()
    const sut = new CriarProdutosService(ingredienteRepository, criarProdutoUseCase)
    return {
        ingredienteRepository,
        criarProdutoUseCase,
        sut
    }
}

const makeData = (): CriarProdutoModel => ({
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [1],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

describe('CriarProdutos Service', () => {

    test('Garantir que ingredienteRepository findById seja chamado com os valores corretos', async () => {
        const { sut, ingredienteRepository } = makeSut()
        const findByIdSpy = jest.spyOn(ingredienteRepository, 'findById')
        const data = makeData()
        await sut.criar([data])
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })


    test('Garantir que se o ingredienteRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, ingredienteRepository } = makeSut()
        jest.spyOn(ingredienteRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar([makeData()])
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que se o ingredienteRepository findById retornar nullo retornar um error', async () => {
        const { sut, ingredienteRepository } = makeSut()
        jest.spyOn(ingredienteRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.criar([makeData()])
        expect(error).toEqual(new Error(`O com a id 1 ingrediente não existe`))
    })

    test('Garantir que criarProdutoUseCase criar seja chamado com os valores corretos', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarProdutoUseCase, 'criar')
        const data = makeData()
        await sut.criar([data])
        expect(criarSpy).toHaveBeenCalledWith(data)
    })


    test('Garantir que se o criarProdutoUseCase criar retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        jest.spyOn(criarProdutoUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar([makeData()])
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar produtos', async () => {
        const { sut } = makeSut()
        const produtos = await sut.criar([makeData()])
        const produto = makeProduto(1)
        expect(produtos).toEqual({
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
        })
    })
})