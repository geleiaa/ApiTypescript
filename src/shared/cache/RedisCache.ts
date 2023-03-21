import { Redis as RedisClient } from 'ioredis';
import redis from '@shared/cache/RedisConfig';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = redis;
  }

  public async saveCache(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recoverCache<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidateCache(key: string): Promise<void> {
    await this.client.del(key);
  }
}
