const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    eAdmin: {
        type: Number,
        default: 0
    }
    /* Aqui, o campo eAdmin receber o valor padrão 0, ou seja, toda vez que um novo usuário se cadastrar ele receberá 0, a não ser que ele seja admin, que então receberá 1.*/
    /*
    Obs: quando passarmos senhas para o banco de dados, é recomendado fazer um hash, que é parecido com uma criptografia, mas não é reversível, de modo que possa ser descoberto. Isto irá melhorar a segurança e impedir que a senha seja descoberta por hackers. O hash códifica, criptografa uma senha de modo irreversível. Para usar os hashs iremos baixar a biblioteca, módulo, bcryptjs. Para isso, faça:
    No cmd, na pasta do projeto:
    - npm install --save bcryptjs
    */
   /*
   Note que apesar do hash ser irreversível, ou seja, apesar de códificarmos a senha de modo que ela não possa ser descoberta, o usuário consegue logar novamente. Isto ocorre porque, apesar de não conseguirmos descobrir o hash, nós podemos comparar mais de um hash.
   */
   /*
   Por fim, para fazer a autenticação do usuário usando o express, vamos baixar o módulo passport. Para isso faça:
   No cmd, na pasta do projeto:
    - npm install --save passport
    Porém, além de baixar o passport, devemos baixar também a estratégia, ou seja, a forma de autenticação, que vamos usar. Para isso, faça:
    No cmd, na pasta do projeto:
    - npm install --save passport-local (caso vá fazer autenticação local, usando o próprio banco de dados.)
   */
})

mongoose.model("usuarios", Usuario)
