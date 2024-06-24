import io from "./server.js"

const documentos = [
    {
        nome: 'JavaScript',
        texto: 'texto sobre javascript...'
    },
    {
        nome: 'Node',
        texto: 'texto sobre Node...'
    },
    {
        nome: 'Socket.io',
        texto: 'texto sobre Socket.io...'
    },
]

io.on('connection', (socket) => {
    console.log('Um cliente se conectou com o servidor! ID:', socket.id)

    socket.on('selecionar_documento', (nomeDocumento) => {
        const documento = encontrarDocumento(nomeDocumento)
        console.log(documento)

        socket.join(nomeDocumento)
    })

    socket.on('editor_texto', ({ texto, nomeDocumento }) => {
        socket.to(nomeDocumento).emit('editor_texto_cliente', texto)
    })
})

function encontrarDocumento(nome) {
    const documento = documentos.find((documento) => {
        return documento.nome === nome;
    })
    return documento;
}