const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', 
        (req, res) => {res.send('Você está na rota /atendimentos.')})

    app.post('/atendimentos',
        (req,res)=> {
            const atendimento = req.body
            Atendimento.add(atendimento)
            res.send('Você está na rota /atendimentos realizando um POST.')
        })
}