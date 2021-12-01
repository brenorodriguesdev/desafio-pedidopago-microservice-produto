import { Ingrediente } from "../entities/ingrediente";

export interface IngredienteRepository {
    findAll: () => Promise<Ingrediente[]>
}