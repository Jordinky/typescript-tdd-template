import { Todo } from "../../domain/todo";
import { TODO_COLLECTION } from "./todo-collection";
import { TodoRepository } from "./todo-repository";

export class TodoMemoRepository implements TodoRepository {
	async getById(id: string): Promise<Todo | null> {
		const todo = TODO_COLLECTION.find((todo) => todo.id === id);

		return todo ? new Todo(todo.id, todo.description, todo.status) : null;
	}

	findAll(): Todo[] {
		const todos = TODO_COLLECTION.map((todo) => todo);

		return todos;
	}

	async deleteById(id: string): Promise<void> {
		try{
			const indexTodoDelete = TODO_COLLECTION.findIndex((todo:any)=>todo.id === id);
			if(indexTodoDelete === -1){
				throw {
					status: 400,
					message: `Can't find todo with the id '${id}'`,
				  };
			}
			TODO_COLLECTION.splice(indexTodoDelete,1);
			
		}catch(error:any){
			throw { status: error?.status || 500, message: error?.message || error };
		}
	}

	async updateTodo(id: any, changes: Array<string>): Promise<Todo | null> {
		try{
			const isAlreadyAdded = 
			TODO_COLLECTION.findIndex((todo:any) => todo.description === id.description) > -1;
				if(isAlreadyAdded){
				throw {
					status: 400,
					message: `Todo with the name '${changes}' already exists`,
				};
			}
			const todoUpdate = TODO_COLLECTION.findIndex((todo:any)=>todo.id === id);
			if (todoUpdate === -1){
				throw {
					status: 400,
					message: `Can't find todo with the id '${id}'`,
				  };
			}
			const updatedTodo = {
				...TODO_COLLECTION[todoUpdate],
				...changes,
				updatedAt: new Date().toLocaleDateString("en-US",{timeZone: "UTC"}),
			};
			TODO_COLLECTION[todoUpdate] = updatedTodo;

			return updatedTodo;
			}catch(error:any){
				throw { status: error?.status || 500, message: error?.message || error };
			}
	}

	async newTodo(newTodo: any): Promise<number> {
		try{
			const isAlreadyAdded = 
			TODO_COLLECTION.findIndex((todo:any) => todo.description === newTodo.description) > -1;
		if(isAlreadyAdded){
			throw {
				status: 400,
				message: `Todo with the name '${newTodo.description}' already exists`,
			  };
		}
		TODO_COLLECTION.push(newTodo);
		return newTodo;
		}catch(error:any){
			throw { status: error?.status || 500, message: error?.message || error };
		}
	}
}
