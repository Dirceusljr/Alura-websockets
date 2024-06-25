import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL)

let documentosColecao;

try {
    await client.connect();

    const db = client.db('alura-websockets');
    documentosColecao = db.collection('documentos');

    console.log('Conexão com o banco de dados realizada com sucesso!')

} catch (erro) {
    console.log(erro)
}

export { documentosColecao }