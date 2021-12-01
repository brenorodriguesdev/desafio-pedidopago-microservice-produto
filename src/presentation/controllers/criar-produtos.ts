import { CriarProdutosUseCase } from "../../domain/useCases/criar-produtos";
import { Validator } from "../../validation/contracts/validator";
import { Controller } from "../contracts/controller";
import { GRPCRequest } from "../contracts/grpc";
import { MissingParamError } from "../errors/missing-param-error";

export class CriarProdutosController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarProdutosUseCase: CriarProdutosUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {

        if (!grpcRequest.request.produtos) {
            throw new MissingParamError('produtos')
        }

        for (let produto of grpcRequest.request.produtos) {
            const error = this.validator.validate(produto)

            if (error) {
                throw error
            }
        }
        

        const {
            produtos
        } = grpcRequest.request

        const produtoLista = await this.criarProdutosUseCase.criar(produtos)
        
        if (produtoLista instanceof Error) {
            throw produtoLista
        }

        return produtoLista
    }
}