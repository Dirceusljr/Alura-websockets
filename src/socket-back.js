import 'dotenv/config.js';
import io from "./server.js"
import { obterDocumentos, encontrarDocumento, adicionarDocumento, atualizaDocumento, excluirDocumento  } from './documentosDb.js';

io.on('connection', (socket) => {

    socket.on('obter_documentos', async (devolverDocumentos) => {
        const documentos = await obterDocumentos();
        devolverDocumentos(documentos)
    })

    socket.on('adicionar_documento', async (nomeDocumento) => {
        const documentoExiste = (await encontrarDocumento(nomeDocumento)) !== null;

        if(documentoExiste) {
            socket.emit('documento_existente', nomeDocumento)
        } else {
            const documento = await adicionarDocumento(nomeDocumento);
    
            if (documento.acknowledged) {
                io.emit('adicionar_documento_interface', nomeDocumento)
            }
        }
    })

    socket.on('selecionar_documento', async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento)
        const documento = await encontrarDocumento(nomeDocumento)
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

    socket.on('excluir_documento', async (nomeDocumento) => {
        const resultado = await excluirDocumento(nomeDocumento);

        if( resultado.deletedCount) {
            io.emit('excluir_documento_sucesso', nomeDocumento)
        }
        
    })
})

