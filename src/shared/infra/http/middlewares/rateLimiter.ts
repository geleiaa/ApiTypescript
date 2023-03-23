import { Request, Response, NextFunction } from 'express';
import redis from '@shared/cache/RedisConfig';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const limiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(req.ip);

    await redis.set('IP_DO_RT', req.ip); // armazena ips que batem no rt

    return next();
  } catch (err) {
    throw new AppError('Bateu no RateLimit kkkk', 429);
  }
}
