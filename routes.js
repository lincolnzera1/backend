require('dotenv').config()
const express = require('express')
const router = express.Router()
const Cadastro = require('./models/Cadastro')


router.post("/", async (req, res) => {
    const {nome, usuario, senha} = req.body

    const cadastro = {
        nome,
        usuario,
        senha
    }

    try {
        await Cadastro.create(cadastro)
         res.send("Cadastro feito")
    } catch (error) {
         res.send("Infelizmente ocorreu um erro: " + error)
    }
})

router.get('/', async (req, res) => {
    const cadastros = await Cadastro.find()
    res.send(cadastros)
})

module.exports = router