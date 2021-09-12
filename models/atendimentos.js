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
                        res.status(201).json({
                            id: result.insertId,
                            values: atendimentoDatado
                        })
                    })
    }}

    list(res){
        const sql = "SELECT * FROM atendimentos"

        connection.query(sql, 
            (err, result) => {
                if(err){
                    res.status(400).json(err)
                }
                res.status(200).json(result)
            }
    )}
    
    listByID(id, res){
        const sql = 'SELECT * FROM atendimentos WHERE id = ?'

        connection.query(sql, id, 
            (err, result) => {
                if(err){
                    res.status(400).json(err)
                }
                res.status(200).json(...result)
            }
    )}
    
    alter(id, values, res){
        const validacoes = []
        if(values.cliente){
            const clienteValido = values.cliente.length >= 3
            validacoes.push({
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Campo Cliente deve ter três ou mais caracteres.'
            })
        }

        if(values.data){
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
            const now = moment().format('YYYY-MM-DD HH:mm:ss')
            const dataValida = moment(values.data).isSameOrAfter(now)
            validacoes.push({
                nome: 'data',
                valido: dataValida,
                mensagem: 'Valor do campo Data é inválido.'
            })            
        }

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
        if(existemErros){
            res.status(400).json(erros)
        }
        
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        connection.query(sql, [values, id], 
            (err, result) => {
                if(err){
                    res.status(400).json(err)
                }
                res.status(200).json(
                    {
                        id,
                        updated_values: values
                    }
                )
            }
    )}

    delete(id, res){
        const sql = 'DELETE FROM atendimentos WHERE ID = ?'

        connection.query(sql, id, 
            (err, result) => {
                if(err){
                    res.status(400).json(err)
                }
                res.status(200).json({deleted_id: id})
            })
    }
}

module.exports= new Atendimento