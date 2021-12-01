import { BuscarProdutoUseCase } from "../../domain/useCases/buscar-produto";
import { Validator } from "../../validation/contracts/validator";
import { Controller } from "../contracts/controller";
import { GRPCRequest } from "../contracts/grpc";

export class BuscarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly buscarProdutoUseCase: BuscarProdutoUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id
        } = grpcRequest.request

        const produto = await this.buscarProdutoUseCase.buscar(id)
        
        return produto
    }
}