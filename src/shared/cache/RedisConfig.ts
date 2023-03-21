import Redis, { RedisOptions } from 'ioredis';
import 'dotenv/config';

const redis = new Redis({
  config: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
  },
  driver: 'redis',
} as RedisOptions);

export default redis;
