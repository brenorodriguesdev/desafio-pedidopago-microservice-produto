import { DeletarProdutoUseCase } from "../../domain/useCases/deletar-produto";
import { Validator } from "../../validation/contracts/validator";
import { Controller } from "../contracts/controller";
import { GRPCRequest } from "../contracts/grpc";

export class DeletarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly deletarProdutoUseCase: DeletarProdutoUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id
        } = grpcRequest.request

        const result = await this.deletarProdutoUseCase.deletar(id)

        if (result instanceof Error) {
            throw result
        }
    }
}