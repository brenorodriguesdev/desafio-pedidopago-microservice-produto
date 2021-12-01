import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Ingrediente } from './ingrediente'
import { Produto } from './produto'

@Entity('produtoIngrediente')
export class ProdutoIngrediente {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @OneToOne(() => Ingrediente)
  @JoinColumn({ name: 'idIngrediente' })
  ingrediente: Ingrediente

  @ManyToOne(() => Produto, produto => produto.ingredientes)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto

}