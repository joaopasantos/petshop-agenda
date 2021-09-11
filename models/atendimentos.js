const connection = require('../infrastructure/connection')

class Atendimento {
    add(atendimento){
        const sql = 'INSERT INTO atendimentos SET ?'

        connection.query(sql,atendimento, 
                (err,res)=> {
                    if(err){
                        console.log(err)
                    }
                    console.log(res)
                })
    }
}

module.exports= new Atendimento