import { Todo } from "../domain/todo";
import { TodoNotFound } from "../domain/todo-not-found";
import { TodoRepository } from "../infraestructure/todo-repository/todo-repository";

export class TodoByIdFinder {
	constructor(private readonly todoRepository: TodoRepository) {}
	async run(id: string): Promise<Todo> {
		const todo = await this.todoRepository.getById(id);

		if (!todo) {
			throw new TodoNotFound(id);
		}

		return todo;
	}
}
