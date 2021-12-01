import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProdutoIngrediente } from './produtoIngrediente'

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  thumbnail: string

  @Column()
  nome: string

  @Column()
  preco: number

  @OneToMany(() => ProdutoIngrediente, produtoIngrediente => produtoIngrediente.produto, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'idProduto' })
  ingredientes: ProdutoIngrediente[]

  @Column()
  disponibilidade: number

  @Column()
  volume: number

  @Column()
  outros?: string
}