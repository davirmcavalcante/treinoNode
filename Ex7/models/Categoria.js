/* Note o nome do arquivo escrito com inicial maiúscula e no singular. É uma boa prática, para nomes de arquivo model! */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Criação de schema, "tabela", Categoria.
const Categoria = new Schema({
    // Campos (colunas)
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
/* Obs: o slug é como se fosse a url que vai direcionar para a categoria. Logo, não deve ter letra maiúscula, nem espaço, nem caracter especial e nem nada do tipo. */

mongoose.model('categorias', Categoria)