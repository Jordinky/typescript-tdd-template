import { Todo } from "../domain/todo";
import { TodoNotFound } from "../domain/todo-not-found";
import { TodoRepository } from "../infraestructure/todo-repository/todo-repository";

export class TodoServices {
	constructor(private readonly todoRepository: TodoRepository) {}

	async getOne(id: string): Promise<Todo> {
		const todo = await this.todoRepository.getById(id);

		if (!todo) {
			throw new TodoNotFound(id);
		}

		return todo;
	}

	async getAll(): Promise<Todo[]> {
		const todos = await this.todoRepository.findAll();

		return todos;
	}

	async deleteTodo(id: string): Promise<void> {
		try{
			await this.todoRepository.deleteById(id);
		}catch(error){
			throw error;
		}
	}

	async updateTodo(id: string, description:string, status: boolean): Promise<Todo> {
		const updateTodo = await this.todoRepository.updateTodo(id, description, status);

		if (!updateTodo) {
			throw new TodoNotFound(id);
		}

		return updateTodo;
	}

	async newTodo(newTodo: any): Promise<number> {
		const insertTodo = new Todo(newTodo.id, newTodo.description, newTodo.status);

		const createTodo = this.todoRepository.newTodo(insertTodo);

		return createTodo;
	}
}
