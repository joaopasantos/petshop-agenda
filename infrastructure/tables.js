class Tables {
    init(connection) {
        this.connection = connection

        this.createAtendimento()
    }

    createAtendimento() {
        const sql = "CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, created_at datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))"

        this.connection.query(sql, (erro)=>{
            if(erro){
                console.log(erro)
            }
            console.log('Table \'atendimentos\' created successfully.')
        })
    }
}

module.exports = new Tables