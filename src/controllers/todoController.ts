import { Request, Response } from "express";
import { TodoService } from "../services";

export class TodoController {
  private readonly todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  getTodos = async (req: Request, res: Response) => {
    const { userId } = req.query;
    if (!userId || isNaN(Number(userId))) {
      res.status(400).json({ message: "Invalid `userId`" });
      return;
    }

    const todos = await this.todoService.getAllTodos(Number(userId));
    res.json(todos);
  };
}
