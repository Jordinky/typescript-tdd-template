import { Todo } from "../../domain/todo";
import { TODO_COLLECTION } from "./todo-collection";
import { TodoRepository } from "./todo-repository";

export class TodoMemoRepository implements TodoRepository {
	async getById(id: string): Promise<Todo | null> {
		const todo = TODO_COLLECTION.find((todo) => todo.id === id);

		return todo ? new Todo(todo.id, todo.description, todo.status) : null;
	}	
	findAll(): Todo[] {
		const todos = TODO_COLLECTION.map(todo => todo);
		return todos
	}
	async deleteById(id: string): Promise<number> {
		const indexTodoDelete = TODO_COLLECTION.findIndex((todo:any)=>todo.id === id);
		if(indexTodoDelete){
			TODO_COLLECTION.splice(indexTodoDelete,1);
		}
		return indexTodoDelete;
	}
	async updateTodo(id: string,changes: Array<string>): Promise<Todo | null> {
		const indexTodoUpdate = TODO_COLLECTION.findIndex((todo:any)=>todo.id === id);
		const update = {
			...TODO_COLLECTION[indexTodoUpdate],
			...changes,
		}
		if(indexTodoUpdate){
			TODO_COLLECTION[indexTodoUpdate] = update;
		}
		return update;
	}
	async newTodo(newTodo: any): Promise<number> {
		const todoAdd = TODO_COLLECTION.findIndex((todo:any)=>todo.id === newTodo.id);
		if(!todoAdd){
			TODO_COLLECTION.push(newTodo);
		}
		return todoAdd;
	}
}
