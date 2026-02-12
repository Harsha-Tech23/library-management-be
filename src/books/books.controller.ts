import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() body: CreateBookDto) {
    return this.booksService.create(body);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.booksService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }
}


