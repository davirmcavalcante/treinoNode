/* Podemos baixar pacotes para ajudar com o desenvolvimento de aplicações web, como o express ou o npm. */
/* O npm, geralmente é baixado junto com o node e a partir dele podemos baixar muitos outros pacotes. Para isso, basta ir no prompt de comando (cmd), verificar se o npm está instalado e a sua versão, colocar o endereço da pasta que em que se encontra o arquivo que irá usar o pacote e então escrever: npm install NomeDoPacote --save. O --save serve para salvar as informações que serão instaladas. No caso, faremos: npm install express --save. */
/* O express é um framework para node.js, bastante util para aplicações back-end, pois é rapido, minimalista (tem poucos recursos, mas é bem simples e tem um workflow, fluxo de trabalho, muito rápido) e etc. Note que ao fazer a instalação do módulo express, aparecerá a pasta node_módules não apenas com o módulo express, mas também com outras dependências além dele, para ajudar no desenvolvimento. Além disso, é criado mais dois pacotes json. */

// Importa o módulo
const express = require("express");

/* Cria uma instancia, ou seja, uma cópia de todo o módulo express, para dentro da constante (ou variável) app. Assim, para usar qualquer funcionalidade do express, basta usar a constante (ou variável) app.*/
const app = express();
/* Obs: usamos a constante, pois assim não corremos o risco de sobrescrever a variável app no decorrer do código e acabar perdendo nossa aplicação. */

/* Uma função de callback é uma função que é executada sempre que um evento acontece. */

// Cria o route (rota, caminho) "/" (barra)
app.get("/", function(req, res){
    // res.send("Hello!") Mostraria Hello na rota indicada.

    // Envia um arquivo
    res.sendFile(__dirname + "/html/index.html");
    /* O "__dirname" coloca o endereço do diretório em que se encontra a pasta ou o arquivo que estamos usando. O resto nós direcionamos com a concatenação. Note que o __dirname tem 2 underlines. */
});
/* Note: o req é a requisição que você recebe e o res é usado para mandar respostas, mensagens. O .send() é usado para enviar a mensagem. */

// Cria a rota "/sobre"
app.get("/sobre", function(req, res){
    /* res.send("Minha pagina sobre"); Mostraria "Minha página sobre" na rota indicada. */

    res.sendFile(__dirname + "/html/sobre.html");
});

// Cria a rota "/blog"
app.get('/blog', function(req, res){
    res.send("Bem vindo ao meu blog!")
});

// Cria rota dinâmica ola com parâmetros cargo, nome e cor
app.get("/ola/:cargo/:nome/:cor", function(req, res){
    /* Mostra todos os parâmetros
    res.send(req.params); */

    // Mostra o parâmetro escolhido
    res.send("<h1>Ola " + req.params.nome + "</h1>" + "<h2> Seu cargo é: " + req.params.cargo + "</h2>" + "<h2> Sua cor favorita é: " + req.params.cor + "</h2>");

    /* Obs: o .send() só pode ser usado uma vez em cada rota, senão ocorre um erro. Por isso aqui, colocamos tudo concatenado, para não precisar de outro send. */
});
/* O req é a primeira variável da função de callback e é responsável por receber dados de uma requisição. */

// Cria o servidor com o express
app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
});

/* Obs: esse comando deve ser escrito por ultimo, ou não conseguiremos criar o servidor. Portanto, qualquer coisa que precise ser criada deve ficar acima do app.listen(). Para ver o servidor, basta ir no navegador e escrever: localhost:numero da porta, assim como fizemos anteriormente. */
/* Para mostrar que o servidor está rodando criamos uma função de callback, ou seja, uma função que é executada sempre que um evento acontece. */
/* Note também que o módulo express é baseado em rotas e de fácil utilização. */

/* Por fim, podemos instalar o módulo nodemon que automatiza as coisas no node, como fechar e abrir o servidor e ir atualizando as informações e alterações realizadas. Para isso seguimos o passo a passo:
abre o cmd > coloca cd e o endereço do diretório que vc ta trabalhando > escreve npm install nodemon -g > enter. 
A flag -g indica que vai baixar o nodemon globalmente, ou seja em todo o sistema e não apenas na pasta que você ta usando. 
Agora, toda vez que você for rodar o projeto utilize o nodemon ao invez de node, no cmd. Ex: C:\Users\davir\OneDrive\Área de Trabalho\treinoNode\Ex3> nodemon app.js. Agora está tudo pronto para uso. */

