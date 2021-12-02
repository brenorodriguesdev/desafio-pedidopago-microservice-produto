import { Controller } from "../../presentation/contracts/controller"

export const adaptService = (controller: Controller) => {
    return async (call: any, callback :any) => {
        try {
            callback(null, await controller.handle({
                request: call.request,
                metadata: call.metadata
            }))
        } catch (error) {
            callback(error, null)
        }
    }
}
