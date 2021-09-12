const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', 
        (req, res) => {
            Atendimento.list(res);
        })

    app.get('/atendimentos/:id',
        (req,res) => {
            const id = req.params.id
            Atendimento.listByID(res, id)
        }
    )

    app.post('/atendimentos',
        (req,res)=> {
            const atendimento = req.body
            Atendimento.add(atendimento, res)
        })
}