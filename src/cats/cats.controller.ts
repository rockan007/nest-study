import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HostParam,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto';
import { Cat } from './interfaces/cat-inderface';

@Controller({ host: ':nestjs.lostbug.com', path: 'cats' })
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @HttpCode(204)
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @Header('Cache-Control', 'none')
  async findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id}cat`;
  }

  @Put()
  updateInfo(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${updateCatDto.id} cat`;
  }

  @Delete()
  remove(@Param('id') id: string) {
    return `This action delete a #${id} cat`;
  }

  @Get('docs')
  @Redirect('https://nestjs.lostbug.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://nestjs.lostbug.com/v5/' };
    }
  }

  @Get('info')
  getInfo(@HostParam('nestjs') account: string) {
    return `This action retun hostParam ${account}`;
  }
}
