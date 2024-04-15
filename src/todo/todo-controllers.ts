import { TodoByIdFinder } from "./todo-find-by-id-finder";
import { TodoNotFound } from "./todo-not-found";
import { Request, Response } from "express";

export class TodoController{

    constructor(private readonly todoByIdFinder: TodoByIdFinder){}

    async run(req: Request, res: Response){
        try{
            const todo = await this.todoByIdFinder(req.params.id);
            res.status(200).send(todo);
        }catch(error){
            if(error instanceof TodoNotFound){
                return res.status(404).send();
            }      
        return res.status(500).send();      
        }
    }

}