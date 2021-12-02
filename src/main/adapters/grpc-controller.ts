import { Controller } from "../../presentation/contracts/controller"

export const adaptService = (controller: Controller) => {
    return (call: any, callback :any) => {
        try {
            callback(null, controller.handle({
                request: call.request,
                metadata: call.metadata
            }))
        } catch (error) {
            callback(error, null)
        }
    }
}
