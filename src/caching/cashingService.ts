import { ICachingClient } from "../Types/types";

export class CachingService {
  private static instance: CachingService | undefined;
  private cachingClient: ICachingClient | undefined;
  private isActive: boolean = true;

  private constructor() {}

  public static readonly getInstance = (): CachingService => {
    if (!CachingService.instance) {
      CachingService.instance = new CachingService();
    }
    return CachingService.instance;
  };

  public setClient(client: ICachingClient): void {
    this.cachingClient = client;
  }

  public readonly connect = (): void => {
    if (this.isActive) {
      this.cachingClient?.connect();
    }
  };

  public readonly disconnect = (): void => {
    this.cachingClient?.disconnect();
  };

  public readonly activate = (): void => {
    this.isActive = true;
  };

  public readonly deactivate = (): void => {
    this.isActive = false;
  };

  public readonly get = async <T>(key: string): Promise<T | null> => {
    if (this.isActive === false || !this.cachingClient?.isReady()) {
      return null;
    }

    const value = await this.cachingClient?.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  };

  public readonly set = <T>(key: string, value: T): void => {
    if (this.isActive || this.cachingClient?.isReady()) {
      this.cachingClient?.setItem(key, value);
    }
  };

  public readonly delete = (key: string): void => {};
}
