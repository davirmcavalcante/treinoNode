/*
Comecemos baixando os módulos necessários. No cmd, na pasta do projeto faça:
- npm install --save express;
- npm install --save express-handlebars;
- npm install --save body-parser;
- npm install --save mongoose
*/
/*
Para integrar nossos arquivos estáticos com o express, vamos usar o bootstrap. Desse modo, basta ir no site do bootstrap, fazer o download, criar uma pasta public dentro da pasta do projeto e colocar os arquivos do download dentro dela. Após isso, deve-se carregar o módulo path que é padrão do node, logo não precisa baixá-lo, apenas criar uma constante para recebê-lo.
*/
/*
Ademais, vamos instalar os módulos express-session, para trabalhar com sessões, e connect-flash, para trabalhar com middlewares. Para isso, faça:
No cmd, na pasta do projeto:
- npm install --save express-session;
- npm install --save connect-flash
*/

// Importação dos módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
const usuarios = require('./routes/usuario')
const passport = require('passport')
require('./config/auth')(passport)

/*
O flash é um tipo de sessão que só aparece uma vez a cada utilização, ou seja, ela envia respostas de curta duração. Para entender melhor, crie uma categoria e veja a mensagem "Categoria criada com sucesso", após atualizar a página ela irá sumir.
*/

// Configurações
    // Sessão e flash
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUnitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    /* Note: o app.use() serve para a criação e configuração de middlewares. Ou seja, todo app.use() é um middleware. */
    // Obs: é importante que o passaport seja passado entre a session e o flash, como mostra acima, na mesma ordem.

    // Middleware
    app.use((req, res, next) => {
        // Criação de variáveis globais
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null;
        /* Essa variável user armazena os dados do usuário logado, caso não haja usuário logado ela recebe valor nulo. */
        next()
    })

    // Body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }}))
    app.set('view engine', 'handlebars')

    // Mongoose
    mongoose.connect("mongodb://localhost/blogapp").then(() => {
        console.log("Conectado ao mongo")
    }).catch((err) => {
        console.log("Erro ao se conectar: " + err)
    })

    // Public
        app.use(express.static(path.join(__dirname, 'public')))
        /*
        Aqui nós estamos falando ao express qual pasta está guardando nossos arquivos estáticos. Após isso, basta linkar nossos arquivos css e js da pasta public no arquivo main.handlebars. Para linkar o arquivo js, você deve pegar o link disnponível no site do bootstrap, na parte bootstrapCDN, ná página onde vc fez o download, e que contém o jquery e o pooper. Agora basta colar o link abaixo do body, além de linkar também o arquivo js da pasta public.
        */
        
        // Criação de middleware
        app.use((req, res, next) => {
            //console.log("Oi, eu sou um middleware!")
            next()
        })
        /* Obs: toda vez que você criar um middleware, lembre de usar o comando next, para passar, dar continuidade nas páginas e não ficar parado com a requisição. */

// Rotas
    app.get('/', (req,res) => {
        //res.send("Rota principal!")
        Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
            res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })
    })

    app.get("/postagem/:slug", (req, res) => {
        // Pesquisa postagem pelo slug que é dado pelo parâmetro da rota.
        Postagem.findOne({slug: req.params.slug}).then((postagem) => {
            if(postagem){
                res.render("postagem/index", {postagem: postagem})
            } else{
                req.flash("error_msg", "Esta postagem não existe!")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno!")
            res.redirect("/")
        })
    })

    app.get("/categorias", (req, res) => {
        Categoria.find().then((categorias) => {
            res.render("categorias/index", {categorias: categorias})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao listar as categorias!")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req, res) => {
        Categoria.findOne({slug: req.params.slug}).then((categoria) => {
            /* Note que quando passamos o método find(), precisamos colocar uma condição dentro. */
            if(categoria){
                Postagem.find({categoria: categoria._id}).then((postagens) => {
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os posts!")
                    res.redirect("/")
                })
            } else{
                req.flash("error_msg", "Esta categoria não existe!")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria")
            res.redirect("/")
        })
    })

    app.get('/404', (req, res) => {
        res.send("Erro 404!")
    })

    app.use('/admin', admin)

    app.use('/usuarios', usuarios)

const PORT = 8089
app.listen(PORT, () => {
    console.log("Servidor rodando!")
})

/* A navbar é um componente do nosso projeto e criamos-na através do bootstrap, copiando um modelo fornecido pelo site do bootstrap em documents > components > Navbar, e colando no arquivo _navbar.handlebars. */
/*
A tag .container é uma classe chamada container do bootstrap que centraliza o conteúdo. Já o mt-4 dá uma margem de 4 espaços do topo.
*/
/*
Analogamente ao navbar, vamos pegar um código de Jumbotron no bootstrap e colocar no arquivo index.handlebars.
*/