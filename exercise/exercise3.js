/*
Dado o comando:
    create table author (id number, name string, age number, city string, state string, country string)

Crie um objeto chamado "database".
    Dentro do objeto "database", crie um objeto chamado "tables".
    Dentro do objeto "tables", crie um objeto com o nome da tabela.
    Dentro do objeto criado com o nome da tabela, crie um objeto chamado "columns", onde as chaves são representadas pelo nome da coluna e o valor pelo tipo.
    Dentro do objeto criado com nome da tabela, crie um array chamado "data".
    Exiba o conteúdo do objeto "database" utilizando JSON.stringify
*/

const query = 'create table author (id number, name string, age number, city string, state string, country string)';

const database = {
    tables: {},
    createTable(sql) {
        const expReg = /create table (\w+) \((.+)\)/;
        const result = sql.match(expReg);

        let tableName = result[1];
        this.tables[tableName] = {
            columns: {},
            data: []
        };

        let columns = result[2].split(',');

        for (let column of columns) {
            column = column.trim().split(' ');
            const key = column[0];
            const type = column[1];
            this.tables[tableName].columns[key] = type;
        }
    },
    execute(sql) {
        if(sql.startsWith("create table") ) {
            return this.createTable(sql);
        }
    }
};

database.execute(query);
console.log(JSON.stringify(database, null, '  '))



