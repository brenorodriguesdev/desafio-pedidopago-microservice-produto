import { AtualizarProdutoModel } from "../../domain/models/atualizar-produto"
import { makeIngrediente } from "../../tests/factories/entities/ingrediente"
import { makeProduto } from "../../tests/factories/entities/produto"
import { makeIngredienteRepository } from "../../tests/factories/repositories/ingrediente-repository"
import { makeProdutoIngredienteRepository } from "../../tests/factories/repositories/produto-ingrediente-repository"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { IngredienteRepository } from "../contracts/ingrediente-repository"
import { ProdutoIngredienteRepository } from "../contracts/produto-ingrediente-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { AtualizarProdutoService } from "./atualizar-produto"

interface SutTypes {
    ingredienteRepository: IngredienteRepository,
    produtoRepository: ProdutoRepository,
    produtoIngredienteRepository: ProdutoIngredienteRepository
    sut: AtualizarProdutoService
}


const makeSut = (): SutTypes => {
    const ingredienteRepository = makeIngredienteRepository()
    const produtoRepository = makeProdutoRepository()
    const produtoIngredienteRepository = makeProdutoIngredienteRepository()
    const sut = new AtualizarProdutoService(ingredienteRepository, produtoRepository, produtoIngredienteRepository)
    return {
        ingredienteRepository,
        produtoRepository,
        produtoIngredienteRepository,
        sut
    }
}

const makeData = (): AtualizarProdutoModel => ({
    id: 1,
    thumbnail: 'thumbnail',
    nome: 'nome',
    preco: 1,
    ingredientes: [1, 2],
    disponibilidade: 1,
    volume: 1,
    outros: 'outros'
})

describe('AtualizarProduto Service', () => {
    test('Garantir que produtoRepository findById seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const findByIdSpy = jest.spyOn(produtoRepository, 'findById')
        const data = makeData()
        await sut.atualizar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o produtoRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o produtoRepository findById retornar nullo retornar um error', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.atualizar(makeData())
        expect(error).toEqual(new Error('Esse produto não foi encontrado!'))
    })

    test('Garantir que ingredienteRepository findById seja chamado com os valores corretos', async () => {
        const { sut, ingredienteRepository } = makeSut()
        const findByIdSpy = jest.spyOn(ingredienteRepository, 'findById')
        const data = makeData()
        await sut.atualizar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })


    test('Garantir que se o ingredienteRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, ingredienteRepository } = makeSut()
        jest.spyOn(ingredienteRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que produtoIngredienteRepository deleteById seja chamado com os valores corretos', async () => {
        const { sut, produtoIngredienteRepository } = makeSut()
        const deleteByIdSpy = jest.spyOn(produtoIngredienteRepository, 'deleteById')
        const data = makeData()
        await sut.atualizar(data)
        expect(deleteByIdSpy).toHaveBeenCalledWith(1)
    })


    test('Garantir que se o produtoIngredienteRepository deleteById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoIngredienteRepository } = makeSut()
        jest.spyOn(produtoIngredienteRepository, 'deleteById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o ingredienteRepository findById retornar nullo retornar um error', async () => {
        const { sut, ingredienteRepository } = makeSut()
        jest.spyOn(ingredienteRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.atualizar(makeData())
        expect(error).toEqual(new Error(`O com a id 1 ingrediente não existe`))
    })

    test('Garantir que produtoIngredienteRepository create seja chamado com os valores corretos', async () => {
        const { sut, produtoIngredienteRepository } = makeSut()
        const createSpy = jest.spyOn(produtoIngredienteRepository, 'create')
        const data = makeData()
        await sut.atualizar(data)
        expect(createSpy).toHaveBeenCalledWith({
            ingrediente: makeIngrediente(1),
            produto: makeProduto(1)
        })
    })


    test('Garantir que se o produtoIngredienteRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoIngredienteRepository } = makeSut()
        jest.spyOn(produtoIngredienteRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que produtoIngredienteRepository update seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const updateSpy = jest.spyOn(produtoRepository, 'update')
        const data = makeData()
        await sut.atualizar(data)
        const produto = makeProduto(1)
        produto.nome = data.nome
        produto.thumbnail = data.thumbnail
        produto.preco = data.preco
        produto.disponibilidade = data.disponibilidade
        produto.volume = data.volume
        produto.outros = data.outros
        expect(updateSpy).toHaveBeenCalledWith(produto)
    })


    test('Garantir que se o produtoRepository update retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'update').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })
})