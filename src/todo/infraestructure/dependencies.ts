import { TodoServices } from "../application/services";
import { TodoController } from "./http/controllers/todo-controller";
import { TodoMemoRepository } from "./todo-repository/todo-memo-repository";

const todoMemoRepository = new TodoMemoRepository();
const todoServices = new TodoServices(todoMemoRepository);
export const todoController = new TodoController(todoServices);
