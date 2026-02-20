import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './borrow.entity';
import { Book } from '../books/entities/book.entity';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Book])],
  providers: [BorrowService],
  controllers: [BorrowController],
})
export class BorrowModule {}


