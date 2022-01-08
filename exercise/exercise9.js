/*
Exercício 9
 
Objetivo

Migre as funções construtoras "DatabaseError" e "Parser" e o objeto "database" para classes.


Instruções

Migre a função construtora "DatabaseError" para uma classe.
Migre a função construtora "Parser" para uma classe.
Migre o objeto "database" para uma classe.
Instancie a classe "Database" no objeto "database".

Cenário

let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
database.execute("delete from author where id = 2");
console.log(JSON.stringify(database.execute("select name, age from author")));

Resultado


[{
    "name": "Douglas Crockford",
    "age": "62"
}, {
    "name": "Martin Fowler",
    "age": "54"
}]

Conteúdo abordado neste exercício

class
constructor
method
new
*/

class DatabaseError {
	constructor(statment, message) {
		this.message = message;
		this.statment = statment;
	}
}
class Parser {
	constructor() {
		this.commands = new Map();
		this.commands.set("createTable", /create table (\w+) \((.+)\)/);
		this.commands.set("insert", /insert into (\w+) \((.+)\) values \((.+)\)/);
		this.commands.set("select", /select (.+) from (\w+)(?: where (.+))?/);
		this.commands.set("delete", /delete from (\w+)(?: where (.+))?/);
	}

	parse(statment) {
		for (let [command, regexp] of this.commands) {
			const parsedStatement = statment.match(regexp);
			if (parsedStatement) {
				return {
					command,
					parsedStatement,
				};
			}
		}
	}
}

class Database {
	constructor() {
		this.tables = {};
		this.parser = new Parser();
	}

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
	}

	insert(sql) {
		const expReg = /insert into (\w+) \((.+)\) values \((.+)\)/;
		const result = sql.match(expReg);

		let [, tableName, columns, values] = result;
		columns = columns.split(", ");
		values = values.split(", ");

		let row = {};
		for (let i = 0; i < columns.length; i++) {
			const column = columns[i];
			const value = values[i];
			row[column] = value;
		}
		this.tables[tableName].data.push(row);
	}

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
	}

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
	}

	execute(sql) {
		const result = this.parser.parse(sql);
		if (result) return this[result.command](sql);

		const message = `Syntax error! Command not found: ${sql}`;
		throw new DatabaseError(sql, message);
	}
};

try {
	let database = new Database();
	database.execute("create table author (id number, name string, age number, city string, state string, country string)");
	database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
	database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
	database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
	database.execute("delete from author where id = 2");
	console.log(JSON.stringify(database.execute("select name, age from author"), undefined, "  "));
} catch (e) {
	console.log(e.message);
}
