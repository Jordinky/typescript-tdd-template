import { TodoByIdFinder } from "../application/todo-find-by-id-finder";
import { TodoController } from "./http/todo-controller";
import { MongoUserRepository } from "./todo-repository/mongo-user-repository";

const mongoUserRepository = new MongoUserRepository();
const userByIdFinder = new TodoByIdFinder(mongoUserRepository);
export const todoController = new TodoController(userByIdFinder);
