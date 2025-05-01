export interface ICachingClient {
  connect(): Promise<void>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: any, ttlSeconds?: number): Promise<void>;
  isExist(key: string): Promise<boolean>;
  disconnect(): Promise<void>;
  isReady(): boolean;
}

export interface Todo {
  id: string;
  userId: number;
  title: string;
  completed: boolean;
}