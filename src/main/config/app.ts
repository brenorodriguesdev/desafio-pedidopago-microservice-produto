const grpc = require('grpc')
const server = new grpc.Server()
import setupServices from './services'

setupServices(server)

export default server
