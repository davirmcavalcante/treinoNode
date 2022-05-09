var soma = function (a, b){
    return a + b;
}

module.exports = soma;

/* Para o código não ficar muito grande se o fizermos todo em uma página, podemos dividí-lo em várias partes, várias páginas, e depois juntá-los como módulos. Para isso basta criar uma variável contendo a função e então escrever o comando: module.exports = NomeDaVariavel;. Obs: podemos exportar qualquer variável. */