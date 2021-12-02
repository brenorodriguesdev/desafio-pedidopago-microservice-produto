import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('ingrediente')
export class Ingrediente {
  @PrimaryColumn()
  id?: number

  @Column()
  nome: string
}