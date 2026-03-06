import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.findAll();
  }

  @Post()
  addBook(@Body() body: any) {
    return this.booksService.create(body);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number) {
    return this.booksService.deleteBook(id);
  }

}



