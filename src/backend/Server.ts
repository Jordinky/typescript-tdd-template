import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { todoRouter } from "../todo/infraestructure/http/todo-router";

export class Server {
	private readonly express: express.Express;
	private readonly port: string;

	constructor(port: string) {
		this.port = port;
		this.express = express();
		this.express.use(helmet());
		this.express.use(cors());
		this.express.use(json());
		this.express.use("/todo", todoRouter);
		this.express.use(urlencoded({ extended: true }));
	}

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			this.express.listen(this.port, () => {
				// eslint-disable-next-line no-console
				console.log(
					`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
						"env"
					)} mode`
				);
				// eslint-disable-next-line no-console
				console.log("✋ Press CTRL-C to stop\n");

				resolve();
			});
		});
	}
}
