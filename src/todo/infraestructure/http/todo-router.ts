import express from "express";

import { todoController } from "../dependencies";

const todoRouter = express.Router();

todoRouter.get("/:id", todoController.getTodo.bind(todoController));
todoRouter.get("/", todoController.getAllTodos.bind(todoController));
todoRouter.post("/", todoController.newTodo.bind(todoController));
todoRouter.patch("/:id", todoController.updateTodo.bind(todoController));
todoRouter.delete("/:id", todoController.deleteTodo.bind(todoController));
export { todoRouter };
