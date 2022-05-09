/*
Criamos uma pasta apenas para as rotas (routes), para facilitar o desenvolvimento e por ser uma boa prática. Assim cada rota pode ser criada em em um arquivo diferente e colocada nessa pasta.
*/
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
/* Aqui carregamos também o nosso model Categoria. Note que para voltar um diretório (pasta) usamos "../", enquanto que para um arquivo no mesmo diretório, usamos apenas "./". */
const Categoria = mongoose.model('categorias')
/* Note: é assim que se chama um model externo, como acima: Importa o mongoose, chama o arquivo do model e depois chama uma função que referencia o model, recebendo-a numa constante. */
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
const {eAdmin} = require('../helpers/eAdmin')
/* O objeto {eAdmin} acima quer dizer que dentro do arquivo eAdmin, que está na pasta helpers, vamos pegar apenas a função eAdmin. */

/*
Quando colocamos as rotas numa pasta diferente ao invés de usar app.get() usamos router.get().
*/
router.get('/', eAdmin, (req, res) => {
    //res.send("Página principal do painel ADM")
    res.render("admin/index")
})

/*
Note que nas rotas que apenas os admins podem entrar é passado o parâmetro eAdmin.
*/

router.get('/posts', eAdmin, (req, res) => {
    res.send("Página de posts")
})

router.get('/categorias', eAdmin, (req, res) =>{
    //res.send("Página de categorias")
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect('/admin')
    })
    /*
    Note que o método sort, com o objeto date de valor desc (descendente), serve para ordenar as categorias, segundo a data em ordem decrescente, ou seja, do mais novo para o mais antigo.
    */
})

router.get('/categorias/add', eAdmin, (req, res) => {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", eAdmin, (req, res) => {
    // Validar formulário
    var erros = []
    
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido!"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido!"})
    }
    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria muito pequeno."})
    }
    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})
    } else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        /* Lembre que o nome e o slug fazem referência aos nossos atributos name, dos inputs, no arquivo addcategorias.handlebars. */
    
        new Categoria(novaCategoria).save().then(() => {
            //console.log("Categoria salva com sucesso!")
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect('/admin/categorias')
        }).catch((err) => {
            //console.log("Erro ao salvar categoria!")
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
            res.redirect('/admin')
        })
    }
})

/*
Obs: quando criamos as rotas em arquivos diferentes, devemos avisar ao express no arquivo principal. Para isso, basta ir no arquivo principal, após as configurações e chamar as rotas, criando uma constante para receber o arquivo e passando uma rota, como prefixo, para receber as rotas. Caso você não queira que a url passe uma rota de prefixo, você deve criar as rotas no arquivo principal.
*/

router.get("/categorias/edit/:id", eAdmin, (req, res) => {
    //res.send("Página de edição de categoria")
    Categoria.findOne({_id: req.params.id}).then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit", eAdmin, (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        // O nome da categoria recebe o valor que temos no sistema.
        categoria.nome = req.body.nome
        // O slug da categoria recebe o valor que temos no sistema.
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria")
            res.redirect("/admin/categorias")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria!")
        req.redirect("/admin/categorias")
    })
    /* 
    Obs: aqui podemos fazer uma validação da edição, assim como fizemos a validação da nova categoria na rota /categoria/nova.
    */
})

// Rota para deletar categorias
router.post('/categorias/deletar', eAdmin, (req, res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria!")
        res.redirect("/admin/categorias")
    })
})

// Rota para listagem de postagens
router.get('/postagens', eAdmin, (req, res) => {
    Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
        /* Note que em populate, colocamos o nome do campo categoria, do model postagem. */
        res.render('admin/postagens', {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens")
        res.redirect("/admin")
    })
})

router.get('/postagens/add', eAdmin, (req, res) => {
    // Passa todas as categorias para nossa view de postagens
    Categoria.find().then((categorias) => {
        res.render('admin/addpostagem', {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/admin")
    })
})
/*
Note que as os arquivos passados por renderização em cada rota, não tem a barra "/" ao iniciar o endereçamento, veja o exemplo acima, em res.render('admin/addpostagem'), o admin não tem barra antes, direfentemente dos outros tipos de respostas.
*/

router.post('/postagens/nova', eAdmin, (req, res) => {
    var erros = []

    if(req.body.categoria == "0"){
        erros.push({texto: "Categoria inválida, registre uma categoria!"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagem", {erros: erros})
    } else{
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
            res.redirect("/admin/postagens")
        })
    }
})

router.get("/postagens/edit/:id", eAdmin, (req, res) => {
    // Pesquisa postagem com o id igual ao parâmetro id passado acima.
    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        Categoria.find().then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem})
            /* Note que o objeto que passamos acima, {categorias: categorias, postagem: postagem}), serve para mostrar no site a categoria e a postagem. Assim como para mostrar os dados em cada campo, nós colocamos um parâmetro value e passamos o campo de forma dinâmica. Veja isso no arquivo editpostagens.handlebars. */
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias!")
            res.redirect("/admin/postagens")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário de edição!")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagens/edit", eAdmin, (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Erro interno!")
            res.redirect("/admin/postagens")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a edição")
        res.redirect("/admin/postagens")
        /* Obs: uma forma de descobrir um erro é colocando para ele aparecer no console, veja abaixo: */
        //console.log(err)
    })
})

router.get("/postagens/deletar/:id", eAdmin, (req, res) => {
    Postagem.remove({_id: req.params.id}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso!")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/admin/postagens")
    })
})
/*
Obs: a forma acima não é muito recomendada, pois é usada uma rota get que não é muito segura. Outra alternativa é fazer da mesma forma que fizemos com as categorias.
*/

module.exports = router