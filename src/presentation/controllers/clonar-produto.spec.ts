import { ProdutoModel } from "../../domain/models/produto"
import { ClonarProdutoUseCase } from "../../domain/useCases/clonar-produto"
import { makeProduto } from "../../tests/factories/entities/produto"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { ClonarProdutoController } from "./clonar-produto"

interface SutTypes {
    validator: Validator,
    clonarProdutoUseCase: ClonarProdutoUseCase,
    sut: ClonarProdutoController
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

const makeClonarProdutoUseCase = (): ClonarProdutoUseCase => {
    class ClonarProdutoUseCaseStub implements ClonarProdutoUseCase {
        async clonar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeProdutoModel()))
        }
    }
    return new ClonarProdutoUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const clonarProdutoUseCase = makeClonarProdutoUseCase()
    const sut = new ClonarProdutoController(validator, clonarProdutoUseCase)
    return {
        validator,
        clonarProdutoUseCase,
        sut
    }
}

const makeRequest = (): GRPCRequest => ({
    request: { id: 1 },
    metadata: {}
})

describe('ClonarProduto controller', () => {
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


    test('Garantir que clonar seja chamado com os valores corretos', async () => {
        const { sut, clonarProdutoUseCase } = makeSut()
        const clonarSpy = jest.spyOn(clonarProdutoUseCase, 'clonar')
        await sut.handle(makeRequest())
        expect(clonarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o clonar retornar uma exceção repassará essa exceção', async () => {
        const { sut, clonarProdutoUseCase } = makeSut()
        jest.spyOn(clonarProdutoUseCase, 'clonar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o clonar uma error retornará uma exceção com esse error', async () => {
        const { sut, clonarProdutoUseCase } = makeSut()
        jest.spyOn(clonarProdutoUseCase, 'clonar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar um produto', async () => {
        const { sut } = makeSut()
        const produto = await sut.handle(makeRequest())
        expect(produto).toEqual(makeProdutoModel())
    })

})