/* Para conectar o mysql ao cmd, após baixar o mysql, caso seu sistema operacional seja o windows faça:
- Primeiro: vá em disco C, arquivo de programas, escolha o mysql, depois o mysql server, depois a pasta bin, então copie o endeço da pasta. Ex.: C:\Program Files\MySQL\MySQL Server 8.0\bin
- Segundo: vá em configurações, depois sistema, depois sobre, clique em configurações avançadas, variáveis de ambiente, selecione Path, clique em editar, depois novo, cole o endereço copiado anteriormente e clique ok em todas as abas. Após isso, basta fechar o cmd e abrir novamente. 
Obs: caso você baixe o mysql através do mysql installer, você terá o mysql command line cliente, que é uma linha de comando dedicada do mysql e não precisa fazer todo o processo feito anteriormente, basta colocar a senha de usuário root e pronto, pode usar o mysql por ali. Caso dê algum erro, pode ser pq o computador não tem o programa microsoft visual c++, então vá no google, no site oficial e instale, depois instale o mysql novamente e repita todo o processo. 
Note: o path do windows é um utilitário que linka executáveis (binários) ao cmd, ou seja, ele permite acessar executáveis a partir do terminal do windows.
*/

/* Para acessar o mysql, vá no cmd e escreva: mysql -h localhost -u root -p. O -h serve para passar o host (o servidor) que você vai se conectar, o localhost quer dizer que é no servidor local (no próprio pc), o -u é para passar o usuário que é o root, como padrão, e o -p, para o password (senha). Após isso, basta digitar a senha de usuário root e pronto. */

/* 
O comando "SHOW DATABASES;" mostra todos os bancos de dados existentes no seu mysql. Os comandos usados aqui são os mesmos do mysql e lembre que ao final de cada comando é necessário o uso de ponto e vírgula (;). 
Ex.: CREATE DATABASE sistemaDeCadastro; cria o banco de dados sistemaDeCadastro. 
Para acessar o banco de dados desejado digite: USE e o nome do banco de dados;. EX.: USE sistemaDeCadastro;
O comando "SHOW TABLES;" mostra todas as tabelas existentes no banco de dados selecionado.
Para criar as tabelas, você pode vir na sua IDE, no caso a vscode, e criar em um arquivo .sql e depois basta copiar e colar no cmd. 
Ex.: CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);
Então copia e cola no cmd.
Para ver a estrutura da tabela, escreva: DESCRIBE e o nome da tabela;. 
Ex.: DESCRIBE usuarios;
O comando "SELECT * FROM <nome da tabela>;" serve para listar, mostrar todos os dados
Ex.: SELECT * FROM usuarios;
O comando "WHERE <condição>" serve para especificar dados.
Ex.: SELECT * FROM usuarios WHERE idade = 8;
O comando "DELETE FROM" serve para excluir dados. 
ATENÇÃO: NÃO USE APENAS O DELETE FROM, SEM O WHERE, POIS IRÁ APAGAR TUDO. Ex.: não faça: DELETE FROM usuários;. Use o delete com o where: DELETE FROM <nome da tabela> WHERE <condicao>;. Ex.: DELETE FROM usuarios WHERE nome = "Lucas";    
O comando "UPDATE" atualiza, edita dados. 
ATENÇÃO: analogamente ao comando DELETE, o UPDATE deve ser usado junto com o where. Além disso, deve-se setar os campos (colunas) que contém os dados que vc quer atualizar e dizer como esse dado vai ficar.
Ex.: UPDATE usuarios SET nome = "Nome de Teste" WHERE nome = "Luis Silva"; 
*/

/* Agora, você pode baixar o módulo sequelize, que permite fazer manipulações do banco de dados dentro do node.js. Além disso, essa ferramenta é versátil e serve para alguns bancos de dados, como: Postgres, MySQL, SQLite e Microsoft SQL Server. Para isso, basta ir no cmd, na pasta do projeto e escrever: "npm install --save sequelize".
Para uso do MySQL, deve-se baixar também o módulo mysql2. Analogamente, vamos fazer: "npm install --save mysql2". */

/* Agora vamos criar o banco de dados test e aprender a fazer a conexão com o banco de dados através do sequelize. */

// Importa o módulo sequelize
const Sequelize = require('sequelize')

// Conecta com o banco de dados
const sequelize = new Sequelize ('test', 'root', 'sua_senha', {
    host: "localhost",
    dialect: 'mysql'
})
/* Note que ao criarmos a conexão precisamos passar os parâmetros: nome do banco de dados, usuário do mysql, senha do mysql e por ultimo um objeto json com o host (local, servidor do banco de dados) e o dialect (qual banco de dados vai se conectar). */

// Teste de autenticação
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro)
})

/* A função then é como se fosse uma função de callback, ela só ocorre se um evento ocorrer. Caso a autenticação seja efetuada, entraremos na função then, caso contrario entraremos na função catch. */

// Criação de model Postagem
const Postagem = sequelize.define('postagens', { 
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

//Postagem.sync({force: true})

/* 
O .define(), define um modelo, uma tabela. O primeiro parâmetro passado é o nome da tabela e no proximo, o json, nós montaremos a tabela, indicando os campos (as colunas) e seus tipos. Para cada campo que vai ser criado, basta acrescentar uma virgula ao final do campo anterior, como no exemplo acima.
*/
/* 
O .sync sincroniza a tabela com o banco de dados.
O {force: true} é para garantir que a tabela será criada.
*/
/* 
Obs: ao criar novas tabelas, retire o sync da tabela anterior, para não ser criada outra tabela ou atualizá-la e perder dados.
*/

// Criação de novas postagens (inserção de dados)
/*
Postagem.create({
    titulo: "Um titulo qualquer",
    conteudo: "blablablablabla blablablablabla blablablablabla"
})
*/
/*
Analogamente ao .sync, quando for inserido algum dado, deve-se comentar ou apagar comando que o fez, para não haver repetição.
*/

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

//Usuario.sync({force: true})
/* Obs: é sugerível que assim que rodar o .sync uma vez, você já comente ou apague-o, para não recriar a tabela. */

// Cricação de novos usuários (inserção de dados)
/*
Usuario.create({
    nome: "Davi",
    sobrenome: "Ricardo",
    idade: 23,
    email: "blabla@gmail.com"
})
*/
/*
Obs: para trabalhar com banco de dados é preferível usar o node ao invés do nodemon, pois o nodemon atualiza automaticamente, podendo causar repetição de dados.
*/