export class DatabaseError {
	constructor(statment, message) {
		this.message = message;
		this.statment = statment;
	}
}