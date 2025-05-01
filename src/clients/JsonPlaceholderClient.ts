import axios, { AxiosInstance } from "axios";
import { Todo } from "../Types";

export class JsonPlaceholderClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string = "https://jsonplaceholder.typicode.com") {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
    });

    this.getTodos = this.getTodos.bind(this);
  }

  async getTodos(): Promise<Todo[]> {
    try {
      const response = await this.client.get("/todos");
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  async getTodoById(todoId: number) {
    try {
      const response = await this.client.get(`/todos/${todoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo with ID ${todoId}:`, error);
      throw error;
    }
  }

  async createTodo(todoData: {
    title: string;
    completed: boolean;
    userId: number;
  }) {
    try {
      const response = await this.client.post("/todos", todoData);
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  async updateTodo(
    todoId: number,
    todoData: { title?: string; completed?: boolean; userId?: number }
  ) {
    try {
      const response = await this.client.put(`/todos/${todoId}`, todoData);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo with ID ${todoId}:`, error);
      throw error;
    }
  }

  async deleteTodo(todoId: number) {
    try {
      const response = await this.client.delete(`/todos/${todoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo with ID ${todoId}:`, error);
      throw error;
    }
  }
}
