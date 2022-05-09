/*
Agora, vamos baixar o banco de dados mongodb, para treinar, pois ele é utilizado da mesma formaque a linguagem JavaScript, o que facilita o uso em conjunto. Para isso baixe o mongodb no siteoficial, na versão community (gratuita) e configure para utilizá-lo a partir do cmd, como fizemos com o mysql. 
Obs: para utilizar o mongo pelo terminal, teremos que manter um outro terminal com o mongod aberto, durante todo o uso do mongo, para manter o servidor aberto. Ainda assim, aparecerá um erro que é porque o servidor não conseguiu achar a pasta db dentro da pasta data no disco c, então devemos criá-la. Portanto, basta ir no disco local c, criar a pasta data e dentro dela criar a pasta db e pronto. O programa está pronto para uso.
*/
/*
Para utilizar o mongo db com o node, vamos baixar o mongoose. Assim, basta fazer:
No cmd, no endereço da pasta do projeto: npm install --save mongoose
*/

const mongoose = require("mongoose")

// Configurando o mongoose
    mongoose.connect("mongodb://localhost/aprendendo").then(() => {
        console.log("MongoDB Conectado...")
    }).catch((err) => {
        console.log("Houve um erro ao se conectar ao mongoBD: " + err)
    })
    /* Note que para se conectar ao mongodb, vamos usar uma espécie de url, colocando mongobd://, o host (local do servidor), / e o nome do banco de dados que vamos usar. Caso esse banco de dados não exista, ao dizer o nome do banco de dados na conexão ele é automaticamente criado. Assim, a conexção fica, por exemplo, da forma: "mongodb://localhost/aprendendo"
    */

// Model - Usuários
    // Define o model
    const UsuarioSchema = mongoose.Schema({
        nome: {
            type: String, 
            require: true
        },
        sobrenome: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        idade: {
            type: Number,
            require: true
        },
        pais: {
            type: String
        }
    })
    /*
    Note que o tipo aqui pode ser os mesmos do JavaScript. Ademais, o require serve para dizer se o registro no campo deve ser obrigatório ou não, caso ele seja omitido quer dizer que não é obrigatório.
    */

    // Define a collection
    mongoose.model('usuarios', UsuarioSchema)
    /* Aqui, deve-se dizer o nome da collection do model, ou seja, o nome da tabela (lembre que no mongo não há tabelas) e depois o nome do model. */

    // Registra usuário
    const Davi = mongoose.model('usuarios')

    new Davi({
        nome: "John",
        sobrenome: "Doe",
        email: "johndoe@email.com",
        idade: 34,
        pais: "EUA"
    }).save().then(() => {
        console.log("Usuário criado com sucesso!")
    }).catch((err) => {
        console.log("Houve um erro ao registrar o usuário: " + err)
    })

/*
O comando "show databases;" mostra os bancos de dados.
O comando use, define o banco que vc quer usar. Exemplo: use aprendendo;
O comando "show collections;" mostra as collections, ou seja, "as tabelas".
O comando "db.nomeDaCollection.find();" mostra os dados da collection. Exemplo: db.usuarios.find();
*/