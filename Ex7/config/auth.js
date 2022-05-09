// Página para configurar e estruturar o sistema de autenticação

// Importação dos módulos necessários
const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// Importação de models
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport){
    /* Analise do campo email e adaptação do campo name="senha", já que usamos o campo name escrito no senha em portugues, no formulário de autenticação. */
    passport.use(new localStrategy({usernameField: 'email', passwordField: "senha"}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: "Esta conta não existe!"})
                // A função done tem três parâmetros: o primeiro são os dados da conta autenticada, como não houve autenticação, atribuimos valor null; o segundo para dizer se a autenticação aconteceu com sucesso ou não e o terceiro em que foi passada uma mensagem.
            }

            // Comparação de senha com senha hasheada (encryptografada, códificada)
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuario)
                } else{
                    return done(null, false, {message: "Senha incorreta!"})
                }
            })
        })
    }))

    // Salvar dados do usuário em uma sessão
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })
    passport.deserializeUser((id, done) => {
        // Encontra usuário pelo id
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}