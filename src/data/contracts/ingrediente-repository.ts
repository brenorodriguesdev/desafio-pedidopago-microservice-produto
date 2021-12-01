import { Ingrediente } from "../entities/ingrediente";

export interface IngredienteRepository {
    findById: (id: number) => Promise<Ingrediente>
}