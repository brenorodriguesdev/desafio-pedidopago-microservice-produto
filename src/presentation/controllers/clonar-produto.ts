import { ClonarProdutoUseCase } from "../../domain/useCases/clonar-produto";
import { Validator } from "../../validation/contracts/validator";
import { Controller } from "../contracts/controller";
import { GRPCRequest } from "../contracts/grpc";

export class ClonarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly clonarProdutoUseCase: ClonarProdutoUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id
        } = grpcRequest.request

        await this.clonarProdutoUseCase.clonar(id)

    }
}