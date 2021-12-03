import { IngredienteRepository } from "../../../data/contracts/ingrediente-repository";
import { Ingrediente } from "../../../data/entities/ingrediente";
import { makeIngrediente } from "../entities/ingrediente";

export const makeIngredienteRepository = (): IngredienteRepository => {
    class IngredienteRepositoryStub implements IngredienteRepository {
        async findById(): Promise<Ingrediente> {
            return new Promise(resolve => resolve(makeIngrediente(1)))
        }
    }
    return new IngredienteRepositoryStub()
}