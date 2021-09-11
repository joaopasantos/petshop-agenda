const moment = require('moment')
const connection = require('../infrastructure/connection')

class Atendimento {
    add(atendimento){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS')
        const created_at = moment().format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, data, created_at}
        const sql = 'INSERT INTO atendimentos SET ?'

        connection.query(sql,atendimentoDatado, 
                (err,res)=> {
                    if(err){
                        console.log(err)
                    }
                    console.log(res)
                })
    }
}

module.exports= new Atendimento