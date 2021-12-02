import { getRepository } from 'typeorm'
import { ProdutoRepository } from '../data/contracts/produto-repository'
import { Produto } from '../data/entities/produto'

export class ProdutoRepositoryTypeORM implements ProdutoRepository {
  async findAll (): Promise<Produto[]> {
    const produtoRepository = getRepository(Produto)
    return await produtoRepository.find({ relations: ['ingredientes', 'ingredientes.ingrediente', 'ingredientes.produto']})
  }

  async findById (id: number): Promise<Produto> {
    const produtoRepository = getRepository(Produto)
    return await produtoRepository.findOne(id, { relations: ['ingredientes', 'ingredientes.ingrediente', 'ingredientes.produto']})
  }

  async create (produto: Produto): Promise<Produto> {
    const produtoRepository = getRepository(Produto)
    produto.id = await produtoRepository.count() + 1

    return await produtoRepository.save(produto)
  }

  async deleteById (id: number): Promise<void> {
    const produtoRepository = getRepository(Produto)
    await produtoRepository.delete(id)
  }

  async update (produto: Produto): Promise<void> {
    const produtoRepository = getRepository(Produto)
    const { id } = produto
    delete produto.id
    await produtoRepository.update({ id }, produto)
  }
}