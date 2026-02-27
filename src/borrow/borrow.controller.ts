import { Controller, Post, Body, UseGuards, Patch, Get, Req } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  borrow(@Req() req, @Body() body: any) {
    return this.borrowService.borrowBook(
      req.user.userId,
      body.bookId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('return')
  returnBook(@Body() body: any) {
    return this.borrowService.returnBook(body.borrowId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.borrowService.findAll();
  }
}