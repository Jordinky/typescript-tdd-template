import { Todo } from "../../domain/todo";

export interface TodoRepository {
	getById(id: string): Promise<Todo | null>;
}
