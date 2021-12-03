import { DeletarProdutoUseCase } from "../../domain/useCases/deletar-produto"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { DeletarProdutoController } from "./deletar-produto"

interface SutTypes {
    validator: Validator,
    deletarProdutoUseCase: DeletarProdutoUseCase,
    sut: DeletarProdutoController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarProdutoUseCase = (): DeletarProdutoUseCase => {
    class DeletarProdutoUseCaseStub implements DeletarProdutoUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarProdutoUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarProdutoUseCase = makeDeletarProdutoUseCase()
    const sut = new DeletarProdutoController(validator, deletarProdutoUseCase)
    return {
        validator,
        deletarProdutoUseCase,
        sut
    }
}

const makeRequest = (): GRPCRequest => ({
    request: { id: 1 },
    metadata: {}
})

describe('DeletarProduto controller', () => {
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


    test('Garantir que deletar seja chamado com os valores corretos', async () => {
        const { sut, deletarProdutoUseCase } = makeSut()
        const deletarSpy = jest.spyOn(deletarProdutoUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(deletarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o deletar retornar uma exceção repassará essa exceção', async () => {
        const { sut, deletarProdutoUseCase } = makeSut()
        jest.spyOn(deletarProdutoUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o deletar uma error retornará uma exceção com esse error', async () => {
        const { sut, deletarProdutoUseCase } = makeSut()
        jest.spyOn(deletarProdutoUseCase, 'deletar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })
})