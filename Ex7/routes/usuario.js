const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})

router.post("/registro", (req, res) => {
    // Validação do registro
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido!"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "E-mail inválido!"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválido!"})
    }
    if(req.body.senha.length < 4){
        erros.push({texto: "Senha muito curta!"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas são diferentes, tente novamente!"})
    }
    if(erros.length > 0){
        res.render("usuarios/registro", {erros: erros})
    } else{
        Usuario.findOne({email: req.body.email}).then((usuario) =>{
            if(usuario){
                req.flash("error_msg", "Já existe uma conta registrada com esse e-mail!")
                res.redirect("/usuarios/registro")
            } else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    //eAdmin: 1 (comando usado para criar admin)
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    /* O salt é como se fosse um salto e serve para melhorar a segurança da senha. No caso, 10 é o valor do salto. */
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        /* O método hash() pede três parâmetros, o primeiro é o que queremos hashear, o segundo é o salt e o terceiro é uma função de call back. */

                        if(erro){
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário!")
                            res.redirect("/")
                        }

                        // Atribui hash para a senha (senha recebe hash)
                        novoUsuario.senha = hash

                        // Salva usuário com senha hasheada
                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Usuário criado com sucesso!")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente!")
                            res.redirect("/usuarios/registro")
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno!")
            res.redirect("/")
        })
    }
})

/*
Obs: quando formos criar formulários, podemos colocar cada label com seu respectivo input dentro de uma div com class="form-group", isso gera um espaço bom entre os campos do formulário e ainda melhores possibilidades de edição.
*/

router.get("/login", (req, res) => {
    res.render("usuarios/login")
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        // Redirecionar para, em caso de sucesso ou falha de autenticação e se haverá mensagem em flash ou não
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
    /* Note que o primeiro parâmetro passado para a autenticação é o tipo de autenticação, ou seja, onde ela irá acontecer. */
})

// Rota para logout
router.get("/logout", (req, res) => {
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect("/")
})

module.exports = router