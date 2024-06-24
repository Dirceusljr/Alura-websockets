import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function emitirTextoEditor(texto) {
    socket.emit('editor_texto', texto)
}

socket.on('editor_texto_cliente', (texto) => {
    atualizaTextoEditor(texto)
})

export { emitirTextoEditor}