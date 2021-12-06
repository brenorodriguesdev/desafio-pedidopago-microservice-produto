import { createConnection, getRepository, getConnection } from 'typeorm'
import { Ingrediente } from '../data/entities/ingrediente'
import { IngredienteRepositoryTypeORM } from './ingrediente-repository'

const makeSut = (): IngredienteRepositoryTypeORM => {
    return new IngredienteRepositoryTypeORM()
}

describe('IngredienteRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        await getConnection().close();
    })

    beforeEach(async () => {
        const ingredienteRepository = getRepository(Ingrediente)
        const ingredientes = await ingredienteRepository.find()
        await ingredienteRepository.remove(ingredientes)
    })


    test('Garantir que o ingrediente seja retornaqdo', async () => {
        const sut = makeSut()

        const ingredienteRepository = getRepository(Ingrediente)
        const ingredienteCreated = await ingredienteRepository.save({
            id: await ingredienteRepository.count() + 1,
            nome: 'nome'
        })

        const ingrediente = await sut.findById(ingredienteCreated.id)

        expect(ingrediente.id).toBe(ingredienteCreated.id)
        expect(ingrediente.nome).toBe('nome')

    })

})