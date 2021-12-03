import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { DeletarProdutoService } from "./deletar-produto"

interface SutTypes {
    produtoRepository: ProdutoRepository,
    sut: DeletarProdutoService
}


const makeSut = (): SutTypes => {
    const produtoRepository = makeProdutoRepository()
    const sut = new DeletarProdutoService(produtoRepository)
    return {
        produtoRepository,
        sut
    }
}

describe('DeletarProduto Service', () => {
    test('Garantir que produtoRepository findById seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const findByIdSpy = jest.spyOn(produtoRepository, 'findById')
        await sut.deletar(1)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o produtoRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o produtoRepository findById retornar nullo retornar um error', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.deletar(1)
        expect(error).toEqual(new Error('Esse produto não foi encontrado!'))
    })

    test('Garantir que produtoRepository deleteById seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const deleteByIdSpy = jest.spyOn(produtoRepository, 'deleteById')
        await sut.deletar(1)
        expect(deleteByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o produtoRepository deleteById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'deleteById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })
})