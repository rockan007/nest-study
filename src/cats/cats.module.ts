import {
  MiddlewareConsumer,
  //Global,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import {
  logger, //方法体中间件
  LoggerMiddleWare, //类中间件
} from 'src/common/middleware/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
//@Global() 全局module
@Module({
  providers: [CatsService],
  controllers: [CatsController],
  //exports: [CatsService],
})
export class CatsModule implements NestModule {
  constructor(private catsService: CatsService) {}
  configure(consumer: MiddlewareConsumer) {
    //consumer is a helper
    consumer
      // 接收的中间件
      .apply(LoggerMiddleWare, logger)
      // 不包括那些路由
      .exclude(
        {
          path: '',
          method: RequestMethod.GET,
        },
        'roots',
      )
      // 接受的路由信息
      .forRoutes(CatsController);
  }
}
