import { TodoRepository } from "./todo-repository";
import { TodoNotFound } from "./todo-not-found";
import { Todo } from "./todo";


export class TodoByIdFinder{
    constructor(private readonly todoRepository:TodoRepository){}
    async run(id:string): Promise<Todo>{
        const todo = await this.todoRepository.getById(id);

        if(!todo){
            throw new TodoNotFound(id);
        }
        return todo;
    }
}