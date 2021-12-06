import { createConnection, getRepository, getConnection } from 'typeorm'
import { Ingrediente } from '../data/entities/ingrediente'
import { Produto } from '../data/entities/produto'
import { ProdutoIngrediente } from '../data/entities/produtoIngrediente'
import { ProdutoIngredienteRepositoryORM } from './produto-ingrediente-repository'

const makeSut = (): ProdutoIngredienteRepositoryORM => {
    return new ProdutoIngredienteRepositoryORM()
}

describe('ProdutoIngredienteRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        await getConnection().close();
    })

    beforeEach(async () => {
        const produtoIngredienteRepository = getRepository(ProdutoIngrediente)
        const produtosIngredientes = await produtoIngredienteRepository.find()
        await produtoIngredienteRepository.remove(produtosIngredientes)
    })

    test('Garantir que a produtoIngrediente seja criado', async () => {
        const sut = makeSut()

        const produtoCreated = await getRepository(Produto).save({
            id: await getRepository(Produto).count() + 1,
            thumbnail: 'thumbnail',
            nome: 'nome',
            preco: 1,
            disponibilidade: 1,
            volume: 1,
            outros: 'outros',
            ingredientes: []
        })

        const ingredienteCreated = await getRepository(Ingrediente).save({
            id: await getRepository(Ingrediente).count() + 1,
            nome: 'nome'
        })

        const produtoIngredienteCreated = await sut.create({
            id: await getRepository(Ingrediente).count() + 1,
            produto: produtoCreated,
            ingrediente: ingredienteCreated
        })

        const produtoIngrediente = await getRepository(ProdutoIngrediente).findOne(produtoIngredienteCreated.id, { relations: ['produto', 'ingrediente']})

        expect(produtoIngrediente.id).toBe(produtoIngredienteCreated.id)
        expect(produtoIngrediente.produto.id).toBe(produtoCreated.id)
        expect(produtoIngrediente.produto.thumbnail).toBe('thumbnail')
        expect(produtoIngrediente.produto.nome).toBe('nome')
        expect(produtoIngrediente.produto.preco).toBe(1)
        expect(produtoIngrediente.produto.disponibilidade).toBe(1)
        expect(produtoIngrediente.produto.volume).toBe(1)
        expect(produtoIngrediente.produto.outros).toBe('outros')

        expect(produtoIngrediente.ingrediente.id).toBe(ingredienteCreated.id)
        expect(produtoIngrediente.ingrediente.nome).toBe('nome')

    })

    test('Garantir que a produtoIngrediente seja deletado', async () => {
        const sut = makeSut()

        const produtoCreated = await getRepository(Produto).save({
            id: await getRepository(Produto).count() + 1,
            thumbnail: 'thumbnail',
            nome: 'nome',
            preco: 1,
            disponibilidade: 1,
            volume: 1,
            outros: 'outros',
            ingredientes: []
        })

        const ingredienteCreated = await getRepository(Ingrediente).save({
            id: await getRepository(Ingrediente).count() + 1,
            nome: 'nome'
        })

        const produtoIngredienteCreated = await sut.create({
            id: await getRepository(Ingrediente).count() + 1,
            produto: produtoCreated,
            ingrediente: ingredienteCreated
        })

        await sut.deleteById(produtoIngredienteCreated.id)

        const produtoIngrediente = await getRepository(ProdutoIngrediente).findOne(produtoIngredienteCreated.id, { relations: ['produto', 'ingrediente']})

        expect(produtoIngrediente).toBeUndefined()

    })

})