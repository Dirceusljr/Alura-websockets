import { documentosColecao } from "./dbConnect.js"

function encontrarDocumentos() {
    const documentos = documentosColecao.find().toArray();
    return documentos;
}

function obterDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    })
    return documento;
}

function adicionarDocumento(nome) {
    const documento = documentosColecao.insertOne({
        nome,
        texto: ''
    })

    return documento;
}

function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome
    }, {
        $set: {
            texto
        }
    })
    return atualizacao;
}

export { encontrarDocumentos, obterDocumento, adicionarDocumento, atualizaDocumento }