import { Request, Response } from "express";

import { TodoServices } from "../../../application/services";
import { TodoNotFound } from "../../../domain/todo-not-found";
import stringToBoolean from "../../../../utils/utils";

export class TodoController {
	constructor(private readonly TodoServices: TodoServices) {}

	async getTodo(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const todo = await this.TodoServices.getOne(id);

			return res.status(200).send(todo);
		} catch (error) {
			if (error instanceof TodoNotFound) {
				return res.status(404).send();
			}

			return res.status(500).send();
		}
	}

	async getAllTodos(req: Request, res: Response) {
		try {
			const todo = await this.TodoServices.getAll();

			return res.status(200).send(todo);
		} catch (error) {
			if (error instanceof TodoNotFound) {
				return res.status(404).send();
			}

			return res.status(500).send();
		}
	}

	async deleteTodo(req: Request, res: Response) {
		const { id } = req.params;
		if (!id) {
			res.status(400).send({
				status: "FAILED",
				data: { error: "Parameter ':id' can not be empty" },
			});
		}
		try {
			const todoDelete = this.TodoServices.deleteTodo(id);
			res.status(200).send({ status: "OK", data: todoDelete });
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ status: "FAILED", data: { error: error?.message || error } });
		}
	}

	async updateTodo(req: Request, res: Response) {
		if (!req.params.id) {
			res.status(400).send({
				status: "FAILED",
				data: { error: "Parameter ':todoId' can not be empty" },
			});
		}
		try {

			const { body } = req;
			if (!body.description || !body.status) {
				res.status(400).send({
					status: "FAILED",
					data: {
						error: "One of the following keys is missing: 'completed','status'",
					},
				});
	
				return;
			}
			if (typeof body.status !== "boolean") {
				res.status(400).send({
					status: "FAILED",
					data: {
						error: "invalid datatype, you must send a boolean (true or false)",
					},
				});
	
				return;
			}

			const updatedTodo = this.TodoServices.updateTodo(req.params.id, body.description, body.status);
			res.status(200).send({ status: "OK", data: updatedTodo });


			
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ status: "FAILED", data: { error: error?.message || error } });
		}
	}

	async newTodo(req: Request, res: Response): Promise<void> {
		const { body } = req;
		if (!body.description) {
			res.status(400).send({
				status: "FAILED",
				data: {
					error: "One of the following keys is missing: 'completed','status'",
				},
			});

			return;
		}

		const allTodos = await this.TodoServices.getAll();
		const lastTodo = allTodos.slice(-1);
		const newId = +lastTodo.map((todo) => todo.id) + 1
		const id:string = newId.toString()

		const status: boolean = false

		const newToDo = {
			id: id, 
			description: body.description,
			status: status,
		};

		try {
			const createdToDo = await this.TodoServices.newTodo(newToDo);
			res.status(201).send({ status: "OK", data: createdToDo });
		} catch (error: any) {
			res
				.status(error?.status || 500)
				.send({ status: "FAILED", data: { error: error?.message || error } });
		}
	}
}
