import { Todo } from "./todo";

export interface TodoRepository{
    getById(id:string): Promise<Todo | null>;
}