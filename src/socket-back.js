import 'dotenv/config.js';
import io from "./server.js"
import { encontrarDocumentos, obterDocumento, adicionarDocumento, atualizaDocumento  } from './documentosDb.js';

io.on('connection', (socket) => {

    socket.on('obter_documentos', async (devolverDocumentos) => {
        const documentos = await encontrarDocumentos();
        devolverDocumentos(documentos)
    })

    socket.on('adicionar_documento', async (nomeDocumento) => {
        const documento = await adicionarDocumento(nomeDocumento);

        if (documento.acknowledged) {
            io.emit('adicionar_documento_interface', nomeDocumento)
        }
    })

    socket.on('selecionar_documento', async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento)
        const documento = await obterDocumento(nomeDocumento)
        if (documento) {
            devolverTexto(documento.texto)
        }
    })

    socket.on('editor_texto', async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto)
        if (atualizacao) {
            socket.to(nomeDocumento).emit('editor_texto_cliente', texto)
        }
    })
})

