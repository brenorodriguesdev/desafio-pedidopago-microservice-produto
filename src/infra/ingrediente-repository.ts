import { getRepository } from 'typeorm'
import { IngredienteRepository } from '../data/contracts/ingrediente-repository'
import { Ingrediente } from '../data/entities/ingrediente'

export class IngredienteRepositoryTypeORM implements IngredienteRepository {
  async findById (id: number): Promise<Ingrediente> {
    const ingredienteRepository = getRepository(Ingrediente)
    return await ingredienteRepository.findOne(id)
  }
}