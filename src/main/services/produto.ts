import { adaptService } from "../adapters/grpc-controller"
import { makeAtualizarProdutoController } from "../factories/controllers/atualizar-produto"
import { makeBuscarProdutoController } from "../factories/controllers/buscar-produto"
import { makClonarProdutoController } from "../factories/controllers/clonar-produto"
import { makeCriarProdutoController } from "../factories/controllers/criar-produto"
import { makeCriarProdutosController } from "../factories/controllers/criar-produtos"
import { makeDeletarProdutoController } from "../factories/controllers/deletar-produto"
import { makeListaProdutosController } from "../factories/controllers/listar-produtos"

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

export default (server: any): void => {
    const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../', 'protos/' , 'produto.proto'))
    const produtoProto = grpc.loadPackageDefinition(protoObject)

    server.addService(produtoProto.ProdutoService.service, {
        atualizar: adaptService(makeAtualizarProdutoController()),
        criar: adaptService(makeCriarProdutoController()),
        criarLista: adaptService(makeCriarProdutosController()),
        clonar: adaptService(makClonarProdutoController()),
        deletar: adaptService(makeDeletarProdutoController()),
        buscar: adaptService(makeBuscarProdutoController()),
        listar: adaptService(makeListaProdutosController()),
    })

}