/* Obs: é boa prática começar o nome de arquivos models com a inicial maiúscula e ainda no singular. */

const db = require('./db')
// Lembre: o "./" serve para dizer que o arquivo está na mesma pasta.

const Post = db.sequelize.define('postagens',{
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

//Post.sync({force: true})
/* Obs: lembre de apagar ou comentar o comando acima toda vez que executar pela primeira vez, para não repetir o comando e criar outro banco de dados, apagando o anterior. */

module.exports = Post