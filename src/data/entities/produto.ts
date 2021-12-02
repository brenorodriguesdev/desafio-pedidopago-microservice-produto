import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { ProdutoIngrediente } from './produtoIngrediente'

@Entity('produto')
export class Produto {
  @PrimaryColumn()
  id?: number

  @Column()
  thumbnail: string

  @Column()
  nome: string

  @Column()
  preco: number

  @OneToMany(() => ProdutoIngrediente, produtoIngrediente => produtoIngrediente.produto)
  @JoinColumn({ name: 'idProduto' })
  ingredientes: ProdutoIngrediente[]

  @Column()
  disponibilidade: number

  @Column()
  volume: number

  @Column()
  outros?: string
}