/*  
No cmd, no endereço da pasta do projeto: npm install express --save
Para instalar o módulo express na pasta do projeto.
*/

/*
Vamos instalar também o template engine handlebars, para auxiliar com o HTML, pois ele fornece muitas funcionalidades, como estruturas de repetição, condicionais e principalmente a possibilidade de acessar e exibir dados do back-end no HTML. Para isso vamos fazer:
No cmd, no endereço da pasta do projeto: npm install --save express-handlebars
*/

/*
Depois, vamos instalar o sequelize e o mysql2:
No cmd, no endereço da pasta do projeto: npm install --save sequelize;
e depois:
No cmd, no endereço da pasta do projeto: npm install --save mysql2
*/

/*
Por fim, vamos instalar a biblioteca body-parser, para ajudar com a manipulação de formulários:
No cmd, no endereço da pasta do projeto: npm install --save body-parser
*/

// Importa o módulo express
const express = require("express")

// Cria uma instâcia, uma constante, que contém o módulo express
const app = express()

// Importa o módulo handlebars
const handlebars = require('express-handlebars')

//Importa o módulo body-parser
const bodyParser = require('body-parser')

//Importa o módulo Post, que nós criamos
const Post = require('./models/Post')

// Config
    // Template Engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }}))
    app.set('view engine', 'handlebars')
    /* Note que definindo o main como padrão, não precisaremos colocar as configurações html em todas as páginas handlebars que criarmos. */
    /* Obs: poderíamos ter declarado anteriormente: 
    const hbs = handlebars.create({defaultLayout: 'main'}) e depois o referenciado em app.engine, assim: 
    app.engine('handlebars', () => hbs).
    Analogamente ao express, em que declaramos app.use("nome", function(req,res){...}), com o handlebars podemos declarar app.engine("nome", () => parâmetros). Aqui temos a chamada arrow function, em que a function é o "() =>" e os parâmetros são o que vêm depois da setinha. No caso, invocamos uma arrow function sem nome dentro do app.engine, para executar a const hbs. Também poderíamos ter feito: function(){hbs}. */

    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// Rotas
app.get('/', function(req, res){
    // O Post.findAll() mostra todos os posts da sua tabela Post do banco de dados
    Post.findAll({order: [['id', 'desc']]}).then(function(posts){
        /* o objeto com atributo order serve para colocar em ordem crescente ou decrescente. Para ordem Decrescente (mais novo para mais antigo),coloca-se DESC, para ordem crescente, ascendente (mais antigo para mais novo), coloca-se ASC.*/
        res.render('home', {posts: posts})
        // Criamos a variavel posts que vai receber os posts do parâmetro da função
    })
})

app.get('/cad', function(req, res){
    //res.send('Rota de cadastro de posts')
    res.render("formulario")
    /* Para passar a pagina formulario.handlebars para o servidor, ou seja, para renderizar o formulário, basta usar o método render('endereco_e_nomeDaPagina') */
})

// Rota para receber formulário
app.post('/add', function(req, res){
    /* Para pegar os dados do formulário, basta usar o req.body.nomeDoCampo, como abaixo. */ 
    //res.send("Texto: " + req.body.titulo + " Conteúdo: " + req.body.conteudo)
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        // Caso o post seja efetuado com sucesso irá exibir a mensagem abaixo
        //res.send("Post criado com sucesso!")

        // Caso o post seja efetuado com sucesso irá redirecionar a para a página principal
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})
// Note os nomes dos campos no arquivo formulario.handlebars.
// Note: só é possível acessar as rotas .get pela url, as rotas .post não.

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso!")
    }).catch(function(erro){
        res.send("Esta postagem não existe!")
    })
    /* Sempre que quisermos destruir, deletar, algo do banco de dados por aqui, devemos usar o método destroy(). Atenção: sempre que formos utilizar algum recurso desse tipo (delete, update, destroy), devemos usar a clausula where, para indicar o que queremos deletar e não deletar tudo. */
})

/* Cria o servidor com o express, indicando a porta e com uma função de callback, para mostrar que o servidor está funcionando. */
app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost8081")
})

/* 
Obs: O método get envia os dados pela url, enquanto o método post não. O método post é mais inteligente e faz o envio de outra maneira. Já o método action diz para qual rota vc quer enviar o formulário.
Note: quando se usa o método post, deve-se usar a função app.post ao invés de app.get, para acessar a rota desejada feita com este método quando alguém fizer uma requisição.
*/
/*
Caso, ao tentar declarar: app.engine('handlebars', handlebars({defaultLayout: 'main'})) apareça o erro "TypeError: Handlebars is not a function", é pq o handlebars atualizou e devemos declarar do seguinte modo agora:
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
Note o .engine.
*/
/*
Ao tentar conectar com o mysql, caso dê o erro:
ERROR 2003 (HY000): Can't connect to MySQL server on 'localhost:3306' (10061)
Provavelmente é pq outra aplicação está usando a mesma porta ou o próprio mysql em outro local. Assim, você pode tentar fechar essas aplicações que estão dando conflito de porta, ou tentar mudar a porta do mysql, ou até mesmo reiniciar o pc. Porém é preciso ter certeza de que o mysql ja está configurado para rodar pelo cmd. Caso nenhuma dessas formas adiantem, no google diz mais algumas possibilidades para tentar resolver o erro.
*/
/*
Caso você tenha o erro: "Handlebars: Access has been denied to resolve the property 'titulo' because it is not an 'own property' of its parent.", vá na parte: 
//Template Engine
    app.engine('handlebars',handlebars.engine({defautLayout: 'main'})) 
e faça:
// Template Engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }}))
*/
/* A estrutura handlebars {{#each x}} ... {{/each}}, quer dizer: para cada x faça algo. No caso, temos:
{{#each posts}}

    <h1>{{titulo}}</h1>
    <p>{{conteudo}}</p>
    <hr>

{{/each}}
ou seja, para cada post, exiba titulo e conteudo.
*/
/*
Lembre: como a pasta node_modules é grande e pesada, não devemos subí-la para o repositorio remoto (github ou outro), para isso usamos o arquivo .gitignore para quando fazermos o commit, o git ignorar a pasta node_modules e não colocá-la no repositório. Quando for necessário baixar o repositório e usar o node_modules, basta dar um npm install, ou um npm --i, ou instalar algum outro módulo que esteja associado que a pasta node_modules já aparece junto.
*/