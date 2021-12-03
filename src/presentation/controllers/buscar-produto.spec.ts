import { ProdutoModel } from "../../domain/models/produto"
import { BuscarProdutoUseCase } from "../../domain/useCases/buscar-produto"
import { makeProduto } from "../../tests/factories/entities/produto"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { BuscarProdutoController } from "./buscar-produto"

interface SutTypes {
    validator: Validator,
    buscarProdutoUseCase: BuscarProdutoUseCase,
    sut: BuscarProdutoController
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

const makeBuscarProdutoUseCase = (): BuscarProdutoUseCase => {
    class BuscarProdutoUseCaseStub implements BuscarProdutoUseCase {
        async buscar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeProdutoModel()))
        }
    }
    return new BuscarProdutoUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const buscarProdutoUseCase = makeBuscarProdutoUseCase()
    const sut = new BuscarProdutoController(validator, buscarProdutoUseCase)
    return {
        validator,
        buscarProdutoUseCase,
        sut
    }
}

const makeRequest = (): GRPCRequest => ({
    request: { id: 1 },
    metadata: {}
})

describe('BuscarProduto controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith({ id: 1 })
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


    test('Garantir que buscar seja chamado com os valores corretos', async () => {
        const { sut, buscarProdutoUseCase } = makeSut()
        const buscarSpy = jest.spyOn(buscarProdutoUseCase, 'buscar')
        await sut.handle(makeRequest())
        expect(buscarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o buscar retornar uma exceção repassará essa exceção', async () => {
        const { sut, buscarProdutoUseCase } = makeSut()
        jest.spyOn(buscarProdutoUseCase, 'buscar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o validate buscar uma error retornará uma exceção com esse error', async () => {
        const { sut, buscarProdutoUseCase } = makeSut()
        jest.spyOn(buscarProdutoUseCase, 'buscar').mockRejectedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que se tudo ocorrrer normalmente retornar um produto', async () => {
        const { sut } = makeSut()
        const produto = await sut.handle(makeRequest())
        expect(produto).toEqual(makeProdutoModel())
    })

})