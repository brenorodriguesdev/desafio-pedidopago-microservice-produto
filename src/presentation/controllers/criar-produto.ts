import { CriarProdutoUseCase } from "../../domain/useCases/criar-produtos";
import { Validator } from "../../validation/contracts/validator";
import { Controller } from "../contracts/controller";
import { GRPCRequest } from "../contracts/grpc";

export class CriarProdutoController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarProdutoUseCase: CriarProdutoUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            thumbnail,
            nome,
            preco,
            ingredientes,
            disponibilidade,
            volume,
            outros
        } = grpcRequest.request

        const produto = await this.criarProdutoUseCase.criar({
            thumbnail,
            nome,
            preco,
            ingredientes,
            disponibilidade,
            volume,
            outros
        })
        
        if (produto instanceof Error) {
            throw produto
        }

        return produto
    }
}