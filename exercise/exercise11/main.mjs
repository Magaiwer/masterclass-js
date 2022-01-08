/* 
Exercício 11
 
Objetivo

Crie um atraso no retorno da função execute por meio de setTimeout e utilize uma promise para tratar o comportamento assíncrono.

Instruções

Envolva o código da função execute em um setTimeout com 1000ms.
Crie uma promise e retorne-a.
Execute o comando "create table".
Após a execução de "create table", utilize a função Promise.all para executar os 3 comandos "insert".
Após a execução dos 3 comandos "insert", faça um select retornando as colunas "name" e "author".

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

Conteúdo abordado neste exercício

Promise
Promise.all
new
*/

import { Database } from "./database.mjs";

let database = new Database();
database
	.execute("create table author (id number, name string, age number, city string, state string, country string)")
	.then(() => {
		return Promise.all([
			database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)"),
			database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)"),
			database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)"),
		]).then(() => {
			return database.execute("select name, age from author").then((result) => {
				console.log(JSON.stringify(result, undefined, "  "));
			});
		});
	})
	.catch((e) => {
		console.log(e.message);
	});
