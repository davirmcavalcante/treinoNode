// Importa o módulo sequelize
const Sequelize = require('sequelize')

// Conexão com o banco de dados
const sequelize = new Sequelize ('postapp', 'root', 'suaSenha', {
    host: "localhost",
    dialect: 'mysql' 
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}