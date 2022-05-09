const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Criação de schema, "tabela", Postagem.
const Postagem = new Schema({
    // Campos (colunas)
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        /* Relacionamentro entre os arquivos Categoria e Postagem. Aqui, o campo categoria armazena um id que é um object. Quando vamos pegar informações de uma postagem, conseguimos também informações da categoria a que ela pertence, usando o método populate(). Veja isso na rota de postagens. */
        type: Schema.Types.ObjectId,
        ref: "categorias", /* Faz referência ao model com nome de collections categorias. */
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("postagens", Postagem)