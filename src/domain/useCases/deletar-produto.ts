export interface DeletarProdutoUseCase {
    deletar: (id: number) => Promise<void | Error>
}