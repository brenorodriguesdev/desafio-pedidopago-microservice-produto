import { createConnection, getRepository, getConnection } from 'typeorm'
import { Produto } from '../data/entities/produto'
import { ProdutoRepositoryTypeORM } from './produto-repository'

const makeSut = (): ProdutoRepositoryTypeORM => {
    return new ProdutoRepositoryTypeORM()
}

describe('ProdutoRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        const produtoRepository = getRepository(Produto)
        const produtos = await produtoRepository.find()
        await produtoRepository.remove(produtos)
        await getConnection().close();
    })

    beforeEach(async () => {
        const produtoRepository = getRepository(Produto)
        const produtos = await produtoRepository.find()
        await produtoRepository.remove(produtos)
    })

    test('Garantir que a produto seja criado', async () => {
        const sut = makeSut()

        const produto = await sut.create({
            thumbnail: 'thumbnail',
            nome: 'nome',
            preco: 1,
            disponibilidade: 1,
            volume: 1,
            outros: 'outros',
            ingredientes: []
        })

        expect(produto.id).toBeTruthy()
        expect(produto.thumbnail).toBe('thumbnail')
        expect(produto.nome).toBe('nome')
        expect(produto.preco).toBe(1)
        expect(produto.disponibilidade).toBe(1)
        expect(produto.volume).toBe(1)
        expect(produto.outros).toBe('outros')
  

    })


    test('Garantir que o produto seja retornado', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            thumbnail: 'thumbnail',
            nome: 'nome',
            preco: 1,
            disponibilidade: 1,
            volume: 1,
            outros: 'outros',
            ingredientes: []
        })


        const produto = await sut.findById(produtoCreated.id)

        expect(produto.id).toBe(produtoCreated.id)
        expect(produto.thumbnail).toBe('thumbnail')
        expect(produto.nome).toBe('nome')
        expect(produto.preco).toBe(1)
        expect(produto.disponibilidade).toBe(1)
        expect(produto.volume).toBe(1)
        expect(produto.outros).toBe('outros')

    })

    test('Garantir que os produtos sejam retornados', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            thumbnail: 'thumbnail',
            nome: 'nome',
            preco: 1,
            disponibilidade: 1,
            volume: 1,
            outros: 'outros',
            ingredientes: []
        })


        const produtos = await sut.findAll()

        const produto = produtos[0]

        expect(produto.id).toBe(produtoCreated.id)
        expect(produto.thumbnail).toBe('thumbnail')
        expect(produto.nome).toBe('nome')
        expect(produto.preco).toBe(1)
        expect(produto.disponibilidade).toBe(1)
        expect(produto.volume).toBe(1)
        expect(produto.outros).toBe('outros')

    })

    test('Garantir que o produto seja deletado', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            thumbnail: 'thumbnail',
            nome: 'nome',
            preco: 1,
            disponibilidade: 1,
            volume: 1,
            outros: 'outros',
            ingredientes: []
        })

        await sut.deleteById(produtoCreated.id)
        const produto = await sut.findById(produtoCreated.id)

        expect(produto).toBeUndefined()

    })

    test('Garantir que o produto seja atualizado', async () => {
        const sut = makeSut()

        const produtoCreated = await sut.create({
            thumbnail: 'thumbnail',
            nome: 'nome',
            preco: 1,
            disponibilidade: 1,
            volume: 1,
            outros: 'outros',
            ingredientes: []
        })

        const id = produtoCreated.id
        produtoCreated.preco = 2
        await sut.update(produtoCreated)
        const produto = await sut.findById(id)
        expect(produto.id).toBe(id)
        expect(produto.thumbnail).toBe('thumbnail')
        expect(produto.nome).toBe('nome')
        expect(produto.preco).toBe(2)
        expect(produto.disponibilidade).toBe(1)
        expect(produto.volume).toBe(1)
        expect(produto.outros).toBe('outros')
    })

})