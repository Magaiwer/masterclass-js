/*
Exercício 6
 
Objetivo

Implemente o método "select". Para isso, é necessário extrair as informações a partir do comando, filtrando os dados pela cláusula "where" e montando os objetos de acordo com as colunas selecionadas.

Instruções

Dada o comando:

select name, age from author where id = 1

Crie um método chamado "select".
Na função "execute", invoque o método "select".
No método "select", retorne todos os registros considerando apenas as colunas selecionadas.
Extraia a cláusula where do comando.
Crie as variáveis columnWhere e valueWhere.
Filtre os registros conforme a cláusula where.

Cenário

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
database.execute("select name, age from author");
database.execute("select name, age from author where id = 1");

Resultado


[{
    "name": "Douglas Crockford",
    "age": "62"
}, {
    "name": "Linus Torvalds",
    "age": "47"
}, {
    "name": "Martin Fowler",
    "age": "54"
}]
[{
    "name": "Douglas Crockford",
    "age": "62"
}, ]


Dicas

Você pode utilizar a operação Array.prototype.map para converter um array em outro e ainda a operação Array.prototype.filter 
para filtrar os dados. Você pode querer ignorar um grupo de captura, 
para isso utiliza a notação ?: dentro do grupo, por exemplo (?: where (.+))?


Conteúdo abordado neste exercício


in
for/of
Object
Array
Array.prototype.push
Array.prototype.filter
Array.prototype.map
Array.prototype.forEach
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
	execute(sql) {
		if (sql.startsWith("create table")) {
			return this.createTable(sql);
		}
		if (sql.startsWith("insert")) {
			return this.insert(sql);
		}
		if (sql.startsWith("select")) {
			return this.select(sql);
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
	//database.execute("select name, age from author");
	//database.execute("select name, age from author where id = 1");
	//console.log(JSON.stringify(database, null, "  "));
	//console.log(JSON.stringify(database.execute("select name, age from author"), undefined, "  "));
	console.log(JSON.stringify(database.execute("select name, age from author where id = 2"), undefined, "  "));
} catch (e) {
	console.log(e.message);
}
