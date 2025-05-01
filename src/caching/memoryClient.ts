import { ICachingClient } from "../Types/types";

export class MemoryClient implements ICachingClient {
  private readonly cache: Map<string, any>;
  private readonly isReadyToUse: boolean = true;

  constructor() {
    this.cache = new Map<string, any>();
  }

  isReady(): boolean {
    return this.isReadyToUse;
  }
  
  connect = (): Promise<void> => {
    console.log("Memory Client Connected");
    return Promise.resolve();
  };

  disconnect = (): Promise<void> => {
    console.log("Memory Client Disconnected");
    return Promise.resolve();
  };

  getItem = (key: string): Promise<string | null> => {
    return Promise.resolve(this.cache.has(key) ? this.cache.get(key) as string : null);
  };

  setItem = (key: string, value: any, ttlSeconds?: number): Promise<void> => {
    this.cache.set(key, JSON.stringify(value));
    return Promise.resolve();
  };

  delete = (key: string): Promise<void> => {
    this.cache.delete(key);
    return Promise.resolve();
  };

  clear = (): void => {
    this.cache.clear();
  };

  isExist = (key: string): Promise<boolean> => {
    return Promise.resolve(this.cache.has(key));
  };
}
