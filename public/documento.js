const socket = io();

const textoEditor = document.getElementById('editor-texto');

textoEditor.addEventListener('keyup', () => {
    socket.emit('editor_texto', textoEditor.value)
})

socket.on('editor_texto_cliente', (texto) => {
    textoEditor.value = texto
})