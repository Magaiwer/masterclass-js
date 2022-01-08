/*
Implemente o método "insert". Para isso, é necessário, como sempre, extrair as informações a partir do comando, 
converter as informações em um objeto e inserir no array "data" da tabela correspondente.


Instruções

Dados os comandos:

insert into author (id, name, age) values (1, Douglas Crockford, 62)
insert into author (id, name, age) values (2, Linus Torvalds, 47)
insert into author (id, name, age) values (3, Martin Fowler, 54)


No objeto "database", crie um método chamado "insert", que recebe o comando por parâmetro.
Na função "execute", invoque o método "insert".
Extraia o nome da tabela para a variável "tableName", as colunas para a variável "columns" e os valores para a variável "values".
Manipule os valores dentro "columns" e "values", separando-os um a um.
Crie um objeto chamado "row" com base nas colunas e valores.
Insira o objeto em "data".


Cenário


database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
*/

const DatabaseError = function (statment, message) {
	this.message = message;
	this.statment = statment;
};

const database = {
	tables: {},
	createTable(sql) {
		const expReg = /create table (\w+) \((.+)\)/;
		const result = sql.match(expReg);

		let [, tableName] = result;
		this.tables[tableName] = {
			columns: {},
			data: [],
		};

		let columns = result[2].split(",");

		for (let column of columns) {
			column = column.trim().split(" ");
			const [key, type] = column;
			this.tables[tableName].columns[key] = type;
		}
	},
	insert(sql) {
		/* database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)"); */
		const expReg = /insert into (\w+) \((.+)\) values \((.+)\)/;
		const result = sql.match(expReg);

		let [, tableName, columns, values] = result;
		columns = columns.split(", ");
		values = values.split(", ");

		row = {};
		for (let i = 0; i < columns.length; i++) {
			const column = columns[i];
			const value = values[i];
			row[column] = value;
		}
		this.tables[tableName].data.push(row);
	},
	execute(sql) {
		if (sql.startsWith("create table")) {
			return this.createTable(sql);
		} else if (sql.startsWith("insert")) {
			return this.insert(sql);
		}

		const message = `Syntax error! Command not found: ${sql}`;
		throw new DatabaseError(sql, message);
	},
};

try {
	database.execute(
		"create table author (id number, name string, age number, city string, state string, country string)"
	);
	database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
	database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
	database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
	console.log(JSON.stringify(database, null, "  "));
} catch (e) {
	console.log(e.message);
}
