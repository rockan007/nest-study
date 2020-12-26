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
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto';

@Controller({ host: ':nestjs.lostbug.com', path: 'cats' })
export class CatsController {
  @Post()
  @HttpCode(204)
  create(@Body() createCatDto: CreateCatDto): string {
    return `This action adds new cat ${createCatDto.name}`;
  }

  @Get()
  @Header('Cache-Control', 'none')
  async findAll(@Query() query: ListAllEntities): Promise<string> {
    return `This action returns all cats (limit:${query.limit} items)`;
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
