import { Todo } from "../../domain/todo";

export interface TodoRepository {
	getById(id: string): Promise<Todo | null>;
	newTodo(newTodo: unknown): Promise<number>;
	findAll(): Array<Todo>;
	deleteById(id: string): Promise<void>;
	updateTodo(id: string, changes: Array<string>): Promise<Todo | null>;
}
