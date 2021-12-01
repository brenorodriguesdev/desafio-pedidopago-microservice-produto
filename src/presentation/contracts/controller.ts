import { GRPCRequest, GRPCResponse } from "./grpc";

export interface Controller {
    handle(grpcRequest: GRPCRequest): Promise<GRPCResponse>
}