// Os helpers são funções ou middlewares que ajudam com certas coisas. Eles são como os middlewares.

module.exports = {
    // Helper para permitir que apenas usuários autenticados e administradores entrem em certas rotas do sistema.
    eAdmin: function(req, res, next){
        // "Se a requisição diz que o usuário está autenticado, faça..."
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }
        
        req.flash("error_msg", "Você precisa ser um admin!")
        res.redirect("/")
    }
    /*
    Note que para esse helper funcionar, devemos carregá-lo dentro da rota desejada, ou seja, dentro da rota admin.
    */
    /* 
    Obs: caso vc queira um helper para que quaisquer usuários, apenas usuários, acessem certas rotas, basta tirar a condição de ser admin, em um código análogo ao de cima.
    */
}