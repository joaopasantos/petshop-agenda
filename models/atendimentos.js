const moment = require('moment')
const connection = require('../infrastructure/connection')

class Atendimento {
    add(atendimento, res){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const created_at = moment().format('YYYY-MM-DD HH:mm:ss')

        const clienteValido = atendimento.cliente.length >= 3
        const dataValida = moment(data).isSameOrAfter(created_at)
        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Valor do campo Data é inválido.'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Campo Cliente deve ter três ou mais caracteres.'
            },
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
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
}

module.exports= new Atendimento