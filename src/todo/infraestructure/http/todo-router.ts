import express from "express";

import { todoController } from "../dependencies";

const todoRouter = express.Router();

todoRouter.get("/:id", todoController.run.bind(todoController));

export { todoRouter };
