import { getRepository } from 'typeorm'
import { ProdutoIngredienteRepository } from '../data/contracts/produto-ingrediente-repository'
import { ProdutoIngrediente } from '../data/entities/produtoIngrediente'

export class ProdutoIngredienteRepositoryORM implements ProdutoIngredienteRepository {

  async create (produtoIngrediente: ProdutoIngrediente): Promise<ProdutoIngrediente> {
    const produtoIngredienteRepository = getRepository(ProdutoIngrediente)
    produtoIngrediente.id = await produtoIngredienteRepository.count() + 1

    return await produtoIngredienteRepository.save(produtoIngrediente)
  }

  async deleteById (id: number): Promise<void> {
    const produtoRepository = getRepository(ProdutoIngrediente)
    await produtoRepository.delete(id)
  }

}