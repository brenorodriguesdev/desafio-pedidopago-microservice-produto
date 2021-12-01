import { GRPCRequest } from "./grpc";

export interface Controller {
    handle(grpcRequest: GRPCRequest): Promise<any>
}