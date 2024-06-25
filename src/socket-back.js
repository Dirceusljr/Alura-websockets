import 'dotenv/config.js';
import { documentosColecao } from "./dbConnect.js"
import io from "./server.js"

io.on('connection', (socket) => {
    console.log('Um cliente se conectou com o servidor! ID:', socket.id)

    socket.on('selecionar_documento', async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento)
        const documento = await encontrarDocumento(nomeDocumento)
        console.log(documento)
        if (documento) {
            devolverTexto(documento.texto)
        }

    })

    socket.on('editor_texto', ({ texto, nomeDocumento }) => {
        const documento = encontrarDocumento(nomeDocumento);
        if (documento) {
            documento.texto = texto;
            socket.to(nomeDocumento).emit('editor_texto_cliente', texto)
        }
    })
})

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    })
    return documento;
}