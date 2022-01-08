import { DatabaseError } from "./database-error.mjs";
import { Parser } from "./parser.mjs";

export class Database {
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
