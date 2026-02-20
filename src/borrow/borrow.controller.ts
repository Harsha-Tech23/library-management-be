import { Controller, Post, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('borrow')
export class BorrowController {

  constructor(private borrowService: BorrowService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  borrow(@Req() req, @Body() body: any) {
    return this.borrowService.borrowBook(
      req.user.userId,
      body.bookId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('return')
  returnBook(@Body() body: any) {
    return this.borrowService.returnBook(body.borrowId);
  }
}

