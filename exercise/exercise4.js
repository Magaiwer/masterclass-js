/* 

Exercício 4
 
Objetivo


Lance uma exceção caso o comando não exista, interrompendo o fluxo de execução.


Instruções

Crie uma função construtora chamada "DatabaseError" que recebe dois parâmetros: "statement" e "message".
Dentro do método "execute", caso o comando passado por parâmetro não exista, instancie a função construtora "DatabaseError", lançando-a como um erro.
Envolva a chamada para o objeto "database" em um bloco try/catch imprimindo a propriedade "message" do objeto "DatabaseError".


Cenário


database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("select id, name from author");


Resultado

"Syntax error: 'select id, name from author'"

Dicas

Não esqueça de utilizar o operador new para instanciar a função construtora "DatabaseError" e de utilizar Template Literals para montar a mensagem de erro.

*/


const DatabaseError = function(statment, message) {
    this.message = message;
    this.statment = statment;
}

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
        const message = `Syntax error! Cannot found command: ${sql}`;
        throw new DatabaseError(sql, message);
    }
};

try {
    database.execute(query);
    database.execute("select id, name from author");
} catch (e) {
    console.log(e.message)
}
