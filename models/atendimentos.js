const moment = require('moment')
const connection = require('../infrastructure/connection')

class Atendimento {
    add(atendimento, res){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        const atendimentoDatado = {...atendimento, data, created_at}
        const sql = 'INSERT INTO atendimentos SET ?'

        connection.query(sql,atendimentoDatado, 
                (err,result)=> {
                    if(err){
                        res.status(400).json(err)
                    }
                    res.status(201).json(result)
                })
    }
}

module.exports= new Atendimento