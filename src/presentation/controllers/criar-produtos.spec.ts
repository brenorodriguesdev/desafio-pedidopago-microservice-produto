import { CriarProdutoModel } from "../../domain/models/criar-produtos"
import { ProdutoModel, ProdutosModel } from "../../domain/models/produto"
import { CriarProdutosUseCase } from "../../domain/useCases/criar-produtos"
import { makeProduto } from "../../tests/factories/entities/produto"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { MissingParamError } from "../errors/missing-param-error"
import { CriarProdutosController } from "./criar-produtos"

interface SutTypes {
    validator: Validator,
    criarProdutosUseCase: CriarProdutosUseCase,
    sut: CriarProdutosController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeProdutoModel = (): ProdutoModel => {
    const produto = makeProduto(1)
    return {
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
    }
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

const makeCriarProdutosUseCase = (): CriarProdutosUseCase => {
    class CriarProdutosUseCaseStub implements CriarProdutosUseCase {
        async criar(): Promise<ProdutosModel | Error> {
            return new Promise(resolve => resolve(makeProdutosModel()))
        }
    }
    return new CriarProdutosUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarProdutosUseCase = makeCriarProdutosUseCase()
    const sut = new CriarProdutosController(validator, criarProdutosUseCase)
    return {
        validator,
        criarProdutosUseCase,
        sut
    }
}

const makeCriarProdutoModel = (): CriarProdutoModel => ({
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [1],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

const makeData = (): any => ({
    produtos: [makeCriarProdutoModel()]
})

const makeRequest = (): GRPCRequest => ({
    request: makeData(),
    metadata: {}
})

describe('CriarProdutos controller', () => {

    test('Garantir que se o produtos não for preenchido retornar um exceção com MissingParamError', async () => {
        const { sut } = makeSut()
        const promise = sut.handle({ request: {}, metadata: {}})
        await expect(promise).rejects.toEqual(new MissingParamError('produtos'))
    })

    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeCriarProdutoModel())
    })

    test('Garantir que se o validate retornar uma exceção repassará essa exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o validate retornar uma exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que criar seja chamado com os valores corretos', async () => {
        const { sut, criarProdutosUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarProdutosUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith(makeData().produtos)
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, criarProdutosUseCase } = makeSut()
        jest.spyOn(criarProdutosUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o criar uma error retornará uma exceção com esse error', async () => {
        const { sut, criarProdutosUseCase } = makeSut()
        jest.spyOn(criarProdutosUseCase, 'criar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar produtos', async () => {
        const { sut } = makeSut()
        const produtos = await sut.handle(makeRequest())
        expect(produtos).toEqual(makeProdutosModel())
    })

})