import {
  //Global,
  Module,
} from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
//@Global() 全局module
@Module({
  providers: [CatsService],
  controllers: [CatsController],
  //exports: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
