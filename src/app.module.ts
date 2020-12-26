import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [CatsModule],
  exports: [CatsService],
  providers: [CatsService],
})
export class AppModule {}
