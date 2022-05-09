/* Para usar o http e outras coisas relacionadas com back-end, podemos utilizar os módulos do node, como o módulo http, para aplicações web, ou o módulo fs, para trabalhar com arquivos. 
Obs: quando vamos importar módulos já do node não precisamos colocar o endereço do módulo, apenas o nome do módulo que vamos usar. */

var http = require('http');

http.createServer(function(req, res){
    res.end("Olá!");
}).listen(8081);

/* Agora, usamos os métodos createServer(), chamando a função(req, res) - em que o req é a requisição do usuário e res a respota do servidor, para criar o servidor http e o método listen(porta) para dizer a porta que o servidor será usado. Algumas opções de porta são a 80, a 90 e a 99, porém muitas aplicações podem usar essas portas e gerar conflito se o seu servidor também utilizá-la ao mesmo tempo. Para revolver isso, pode-se usar portas com números mais altos, como 8786 ou 8081. Dentro da função de parâmetro req e res, podemos escrever algo para aparecer no servidor com o comando .end. Pronto, o servidor está criado. */

console.log("Servidor rodando!");

/* Para ver o servidor rodando na web, basta ir no navegador e escrever: localhost:número da porta. No caso, temos: localhost:8081. 
Caso não tenha sido criada nenhuma resposta, o servidora irá carregar infinitamente, sem mostrar nada, apesar de estar criado. Para resolver isso podemos escrever uma resposta, como na função acima (res.end("Olá!");). Após isso, devemos fechar o servidor no cmd (apertando ctrl + c) e abrir novamente, para o servidor atualizar, pois diferentemente da linguagem php e outras, o node funciona assim. Para resolver isso, vamos conhecer o módulo nodemon junto com outros frameworks, como o express, mais adiante. */
