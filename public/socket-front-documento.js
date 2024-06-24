import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function emitirTextoEditor(dados) {
    socket.emit('editor_texto', dados)
}

function selecionaDocumento(nome) {
    socket.emit('selecionar_documento', nome)}

socket.on('editor_texto_cliente', (texto) => {
    atualizaTextoEditor(texto)
})

export { emitirTextoEditor, selecionaDocumento }