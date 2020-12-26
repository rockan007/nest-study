import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter2 } from './common/exception-filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局中间件
  app.use(logger);
  const { httpAdapter } = app.get(HttpAdapterHost);
  // 全局filters
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new AllExceptionsFilter2(httpAdapter),
  );
  await app.listen(3000);
}
bootstrap();
