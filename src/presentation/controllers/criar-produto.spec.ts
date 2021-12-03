import { CriarProdutoModel } from "../../domain/models/criar-produtos"
import { ProdutoModel } from "../../domain/models/produto"
import { CriarProdutoUseCase } from "../../domain/useCases/criar-produtos"
import { makeProduto } from "../../tests/factories/entities/produto"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { CriarProdutoController } from "./criar-produto"

interface SutTypes {
    validator: Validator,
    criarProdutoUseCase: CriarProdutoUseCase,
    sut: CriarProdutoController
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

const makeCriarProdutoUseCase = (): CriarProdutoUseCase => {
    class CriarProdutosUseCaseStub implements CriarProdutoUseCase {
        async criar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeProdutoModel()))
        }
    }
    return new CriarProdutosUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarProdutoUseCase = makeCriarProdutoUseCase()
    const sut = new CriarProdutoController(validator, criarProdutoUseCase)
    return {
        validator,
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

const makeRequest = (): GRPCRequest => ({
    request: makeData(),
    metadata: {}
})

describe('CriarProduto controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeData())
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


    test('Garantir que clonar seja chamado com os valores corretos', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        const buscarSpy = jest.spyOn(criarProdutoUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(buscarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o clonar retornar uma exceção repassará essa exceção', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        jest.spyOn(criarProdutoUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o criar uma error retornará uma exceção com esse error', async () => {
        const { sut, criarProdutoUseCase } = makeSut()
        jest.spyOn(criarProdutoUseCase, 'criar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar um produto', async () => {
        const { sut } = makeSut()
        const produto = await sut.handle(makeRequest())
        expect(produto).toEqual(makeProdutoModel())
    })

})