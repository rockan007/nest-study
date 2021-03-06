import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat-inderface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll({ activeOnly, page }): Cat[] {
    return this.cats;
  }
}
