import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io();

function emitirTextoEditor(dados) {
    socket.emit('editor_texto', dados)
}

function selecionaDocumento(nome) {
    socket.emit('selecionar_documento', nome, (texto) => {
        atualizaTextoEditor(texto)
    })}

socket.on('editor_texto_cliente', (texto) => {
    atualizaTextoEditor(texto)
})

function emitirExcluirDocumento(nome) {
    socket.emit('excluir_documento', nome);
}

socket.on('excluir_documento_sucesso', (nome) => {
    alertarERedirecionar(nome);
})

export { emitirTextoEditor, selecionaDocumento, emitirExcluirDocumento }