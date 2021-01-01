import Joi from '@hapi/joi';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Header,
  HostParam,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Redirect,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception-filters/http-exception.filter';
import { JoiValidtionPipe } from 'src/common/pipes/joi-validation.pipe';
import { ParseIntPipe } from 'src/common/pipes/parse-in.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto';
import { Cat } from './interfaces/cat-inderface';
const createCatSchema = Joi.object().keys({ username: Joi.string().min(3) });
@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @HttpCode(204)
  @UsePipes(new JoiValidtionPipe(createCatSchema))
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  @Header('Cache-Control', 'none')
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ): Promise<Cat[]> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.catsService.findAll({ activeOnly, page });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
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
