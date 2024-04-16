export class TodoNotFound extends Error {
	constructor(id: string) {
		super(`todo not found "${id}"`);
	}
}
