const mongoose = require('mongoose')

const Cadastro = mongoose.model("Cadastro", {
    nome: String,
    usuario: String,
    senha: String,

})

module.exports = Cadastro