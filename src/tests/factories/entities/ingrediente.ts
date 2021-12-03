import { Ingrediente } from "../../../data/entities/ingrediente";

export const makeIngrediente = (id: number): Ingrediente => {
    const ingrediente = new Ingrediente()
    ingrediente.id = id
    ingrediente.nome = 'Ingrediente ' + id
    return ingrediente
}