import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ingrediente')
export class Ingrediente {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  nome: string
}