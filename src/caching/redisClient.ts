import { createClient } from "redis";
import { ICachingClient } from "../Types/types";

export class RedisClient implements ICachingClient {
  private readonly client;
  private isReadyToUse: boolean = true;

  constructor() {
    this.client = createClient({ url: "redis://redis-server:6379" });
  }

  isReady(): boolean {
    return this.isReadyToUse;
  }

  connect = async (): Promise<void> => {
    this.client.connect().catch(() => {
      console.log("Failed to connect to Redis server");
      this.isReadyToUse = false;
    });

    this.client.on("error", (err) => {
      console.log("Redis Client Error", err);
      this.isReadyToUse = false;
    });

    this.client.on("connect", () => {
      console.log("Redis Client Connected");
      this.isReadyToUse = true;
    });
  };

  getItem = async (key: string): Promise<string | null> => {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error("Error getting item from cache:", error);
      return null;
    }
  };

  setItem = async (
    key: string,
    value: any,
    ttlSeconds?: number
  ): Promise<void> => {
    try {
      if (ttlSeconds) {
        await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
      } else {
        await this.client.set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting item in cache:", error);
    }
  };

  isExist = async (key: string): Promise<boolean> => {
    try {
      const exists = await this.client.exists(key);
      return exists === 1;
    } catch (error) {
      console.error("Error checking item existence in cache:", error);
      return false;
    }
  };

  disconnect = async (): Promise<void> => {
    await this.client.quit();
    console.log("Redis Client shutdown");
  };
}
