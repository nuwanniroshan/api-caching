import { v4 as uuidv4 } from "uuid";
import { Todo } from "../Types";
import { JsonPlaceholderClient } from "../clients";
import { CachingService } from "../caching/cashingService";

const ALL_TODOS_KEY = "TODO";

export class TodoService {
  private readonly todos: Map<string, Todo>;
  private readonly client: JsonPlaceholderClient;
  private readonly cacheService: CachingService;

  constructor() {
    this.todos = new Map<string, Todo>();
    this.client = new JsonPlaceholderClient();
    this.cacheService = CachingService.getInstance();
  }

  createTodo = (title: string, userId: number): Todo => {
    const id = uuidv4();
    const newTodo: Todo = { id, title, userId, completed: false };
    this.todos.set(id, newTodo);
    return newTodo;
  };

  getTodoById = (id: string): Todo | undefined => {
    return this.todos.get(id);
  };

  getAllTodos = async (userId: number): Promise<Todo[]> => {
    const cacheKey = `${ALL_TODOS_KEY}:${userId}`;
    const todosFromCache = await this.cacheService.get<Todo[]>(cacheKey);

    if (todosFromCache) {
      return todosFromCache;
    }

    const todos = (await this.client.getTodos()).filter(
      (t) => t.userId === userId
    );

    if (todos) {
      this.cacheService.set(cacheKey, todos);
    }

    return todos;
  };

  updateTodo(id: string, updates: Partial<Omit<Todo, "id">>): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) return undefined;

    const updatedTodo = { ...todo, ...updates };
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  deleteTodo(id: string): boolean {
    return this.todos.delete(id);
  }
}
