/*
function somar(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mult(a, b){
    return a * b;
}

function div(a, b){
    return a / b;
}
*/

//console.log(sub(2, 4));

/* Como nós quebramos essas funções em módulos, para carregá-los aqui precisamos utilizar a função require("EndereçoDoMódulo"), que é uma função específica para o node.js que carrega o módulo, e usá-la como variável. */

var SomaFunc = require("./somar");
var SubFunc = require("./sub");
var MultiFunc = require("./mult");
var DivFunc = require("./div");
// Note: o "./" serve para dizer que o arquivo está na mesma pasta.

console.log(SomaFunc(1, 2));
console.log(SubFunc(10, 5));
console.log(MultiFunc(2, 4));
console.log(DivFunc(30, 3));

// Note, estamos guardando nosso módulo em uma variável para poder usá-lo depois.