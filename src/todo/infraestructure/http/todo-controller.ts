import { Request, Response } from "express";

import { TodoByIdFinder } from "../../application/todo-find-by-id-finder";
import { TodoNotFound } from "../../domain/todo-not-found";

export class TodoController {
	constructor(private readonly todoByIdFinder: TodoByIdFinder) {}

	async run(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const todo = await this.todoByIdFinder.run(id);

			return res.status(200).send(todo);
		} catch (error) {
			if (error instanceof TodoNotFound) {
				return res.status(404).send();
			}

			return res.status(500).send();
		}
	}
}
