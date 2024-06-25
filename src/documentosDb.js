import { documentosColecao } from "./dbConnect.js"

function encontrarDocumentos() {
    const documentos = documentosColecao.find().toArray();
    console.log(documentos)
    return documentos;
}

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
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

export { encontrarDocumento, atualizaDocumento, encontrarDocumentos }