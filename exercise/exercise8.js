/*
Exercício 8
 
Objetivo


Implemente a função construtora "Parser", que será responsável por receber o comando, 
identificá-lo e extraí-lo após a execução da expressão regular. Além disso, 
o nome do comando também deve ser retornado para que ele seja selecionado dinamicamente no método "execute".


Instruções

1- Crie uma função construtora chamada "Parser".
2- Dentro de "Parser", crie um Map chamando "commands" onde a chave é o nome do comando e o valor é a expressão regular.
3- Crie um método chamado "parse" que recebe "statement".
4- Dentro do método "parse" itere em "commands" fazendo um match em cada uma das expressões regulares com o "statement" até identificar a expressão responsável pelo comando.
5- Após encontrar a expressão regular, retorne um objeto contendo o nome do comando na propriedade "command" e o resultado da execução do método "match" na propriedade "parsedStatement".
6- No objeto "database", crie uma propriedade chamada "parser" e instancie a função construtora "Parser".
7- No método "execute", execute o método "parse" e faça o chaveamento do comando dinamicamente.
8- Refatore os métodos "createTable", "insert", "select" e "delete" para receberem o "parsedStatement" e não mais o "statement".


Cenário

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
database.execute("delete from author where id = 2");
database.execute("select name, age from author");

Resultado

[{
    "name": "Douglas Crockford",
    "age": "62"
}, {
    "name": "Martin Fowler",
    "age": "54"
}]


Dicas


Dentro do método "parse", você pode iterar sobre o Map de "commands" com for/of e utilizar destructuring para extrair o "command" e o "parsedStatement".

*/

const DatabaseError = function (statment, message) {
	this.message = message;
	this.statment = statment;
};
const Parser = function () {
	const commands = new Map();
	commands.set("createTable", /create table (\w+) \((.+)\)/);
	commands.set("insert", /insert into (\w+) \((.+)\) values \((.+)\)/);
	commands.set("select", /select (.+) from (\w+)(?: where (.+))?/);
	commands.set("delete", /delete from (\w+)(?: where (.+))?/);

	this.parse = function (statment) {
		for (let [command, regexp] of commands) {
			const parsedStatement = statment.match(regexp);
			if (parsedStatement) {
				return {
					command,
					parsedStatement,
				};
			}
		}
	};
};

const database = {
	tables: {},
	parser: new Parser(),
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
	select(sql) {
		const regexp = /select (.+) from (\w+)(?: where (.+))?/;

		const result = sql.match(regexp);
		let [, columns, tableName, whereClause] = result;
		columns = columns.split(", ");
		let rows = this.tables[tableName].data;

		if (whereClause) {
			const [columnWhere, valueWhere] = whereClause.split(" = ");
			rows = rows.filter(function (row) {
				return row[columnWhere] === valueWhere;
			});
		}

		rows = rows.map(function (row) {
			let selectedRow = {};

			columns.forEach((column) => {
				selectedRow[column] = row[column];
			});

			return selectedRow;
		});

		return rows;
	},
	delete(sql) {
		const regexp = /delete from (\w+)(?: where (.+))?/;
		const result = sql.match(regexp);
		let [, tableName, whereClause] = result;
		let rows = this.tables[tableName].data;

		if (whereClause) {
			const [columnWhere, valueWhere] = whereClause.split(" = ");
			rows = rows.filter((row) => row[columnWhere] !== valueWhere);
		} else rows = [];

		this.tables[tableName].data = rows;
	},
	execute(sql) {
		const result = this.parser.parse(sql);
		if (result) return this[result.command](sql);

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
	database.execute("delete from author where id = 2");
	database.execute("select name, age from author");
	console.log(JSON.stringify(database.execute("select name, age from author"), undefined, "  "));
} catch (e) {
	console.log(e.message);
}
