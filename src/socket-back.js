import io from "./server.js"

io.on('connection', (socket) => {
    console.log('Um cliente se conectou com o servidor! ID:', socket.id)

    socket.on('selecionar_documento', (nomeDocumento) => {
        socket.join(nomeDocumento)
    })

    socket.on('editor_texto', (texto) => {
        // socket.broadcast.emit('editor_texto_cliente', texto)

        socket.to("JavaScript").emit('editor_texto_cliente', texto)
    })
})