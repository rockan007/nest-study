import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';

@Module({
  imports: [CatsModule],
  exports: [CatsService],
  providers: [
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
