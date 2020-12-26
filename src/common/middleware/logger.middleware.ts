import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//使用类注册中间件
@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

//使用方法注册中间件
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}
