import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {

  constructor(private borrowService: BorrowService) {}

  @Post()
  borrowBook(@Body() data: any) {
    return this.borrowService.borrowBook(data);
  }

  @Get(':userId')
  getBorrowedBooks(@Param('userId') userId: number) {
    return this.borrowService.getBorrowedBooks(userId);
  }

  @Patch('return/:id')
  returnBook(@Param('id') id: number) {
    return this.borrowService.returnBook(id);
  }

}