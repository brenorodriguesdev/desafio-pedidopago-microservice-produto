import { AtualizarProdutoUseCase } from "../../domain/useCases/atualizar-produto";
import { Validator } from "../../validation/contracts/validator";
import { Controller } from "../contracts/controller";
import { GRPCRequest } from "../contracts/grpc";

export class AtualizarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly atualizarProdutoUseCase: AtualizarProdutoUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id,
            thumbnail,
            nome,
            preco,
            ingredientes,
            disponibilidade,
            volume,
            outros
        } = grpcRequest.request

        const result = await this.atualizarProdutoUseCase.atualizar({
            id,
            thumbnail,
            nome,
            preco,
            ingredientes,
            disponibilidade,
            volume,
            outros
        })

        if (result instanceof Error) {
            throw result
        }
        
    }
}