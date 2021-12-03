import { CriarProdutoModel } from "../../domain/models/criar-produtos"
import { makeIngrediente } from "../../tests/factories/entities/ingrediente"
import { makeProduto } from "../../tests/factories/entities/produto"
import { makeIngredienteRepository } from "../../tests/factories/repositories/ingrediente-repository"
import { makeProdutoIngredienteRepository } from "../../tests/factories/repositories/produto-ingrediente-repository"
import { makeProdutoRepository } from "../../tests/factories/repositories/produto-repository"
import { IngredienteRepository } from "../contracts/ingrediente-repository"
import { ProdutoIngredienteRepository } from "../contracts/produto-ingrediente-repository"
import { ProdutoRepository } from "../contracts/produto-repository"
import { CriarProdutoService } from "./criar-produto"

interface SutTypes {
    ingredienteRepository: IngredienteRepository,
    produtoRepository: ProdutoRepository,
    produtoIngredienteRepository: ProdutoIngredienteRepository
    sut: CriarProdutoService
}


const makeSut = (): SutTypes => {
    const ingredienteRepository = makeIngredienteRepository()
    const produtoRepository = makeProdutoRepository()
    const produtoIngredienteRepository = makeProdutoIngredienteRepository()
    const sut = new CriarProdutoService(ingredienteRepository, produtoRepository, produtoIngredienteRepository)
    return {
        ingredienteRepository,
        produtoRepository,
        produtoIngredienteRepository,
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

describe('CriarProduto Service', () => {
    
    test('Garantir que ingredienteRepository findById seja chamado com os valores corretos', async () => {
        const { sut, ingredienteRepository } = makeSut()
        const findByIdSpy = jest.spyOn(ingredienteRepository, 'findById')
        const data = makeData()
        await sut.criar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })


    test('Garantir que se o ingredienteRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, ingredienteRepository } = makeSut()
        jest.spyOn(ingredienteRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que se o ingredienteRepository findById retornar nullo retornar um error', async () => {
        const { sut, ingredienteRepository } = makeSut()
        jest.spyOn(ingredienteRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.criar(makeData())
        expect(error).toEqual(new Error(`O com a id 1 ingrediente não existe`))
    })

    test('Garantir que produtoIngredienteRepository create seja chamado com os valores corretos', async () => {
        const { sut, produtoIngredienteRepository } = makeSut()
        const createSpy = jest.spyOn(produtoIngredienteRepository, 'create')
        const data = makeData()
        await sut.criar(data)
        expect(createSpy).toHaveBeenCalledWith({
            ingrediente: makeIngrediente(1),
            produto: makeProduto(1)
        })
    })

    test('Garantir que se o produtoIngredienteRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoIngredienteRepository } = makeSut()
        jest.spyOn(produtoIngredienteRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que produtoRepository create seja chamado com os valores corretos', async () => {
        const { sut, produtoRepository } = makeSut()
        const createSpy = jest.spyOn(produtoRepository, 'create')
        const data = makeData()
        await sut.criar(data)
        expect(createSpy).toHaveBeenCalledWith({
            thumbnail: data.thumbnail,
            nome: data.nome,
            preco: data.preco,
            ingredientes: [],
            disponibilidade: data.disponibilidade,
            volume: data.volume,
            outros: data.outros
        })
    })

    test('Garantir que se o produtoRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoRepository } = makeSut()
        jest.spyOn(produtoRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar o produto', async () => {
        const { sut } = makeSut()
        const produtoResponse = await sut.criar(makeData())
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
})