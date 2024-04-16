import { Todo } from "../../domain/todo";
import { TODO_COLLECTION } from "./todo-collection";
import { TodoRepository } from "./todo-repository";

export class MongoUserRepository implements TodoRepository {
	async getById(id: string): Promise<Todo | null> {
		const todo = TODO_COLLECTION.find((todo) => todo.id === id);

		return todo ? new Todo(todo.id, todo.description, todo.status) : null;
	}
}
