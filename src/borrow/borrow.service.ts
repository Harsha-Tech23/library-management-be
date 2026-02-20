import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class BorrowService {

  constructor(
    @InjectRepository(Borrow)
    private borrowRepo: Repository<Borrow>,

    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async borrowBook(userId: number, bookId: number) {

    const book = await this.bookRepo.findOneBy({ id: bookId });

    if (!book) throw new BadRequestException('Book not found');

    if (book.availableQuantity <= 0)
      throw new BadRequestException('Book not available');

    book.availableQuantity -= 1;
    await this.bookRepo.save(book);

    const borrow = this.borrowRepo.create({ userId, bookId });

    return this.borrowRepo.save(borrow);
  }

   async returnBook(borrowId: number) {

  const record = await this.borrowRepo.findOneBy({ id: borrowId });

  if (!record) {
    throw new BadRequestException('Borrow record not found');
  }

  if (record.returned) {
    throw new BadRequestException('Already returned');
  }

  const book = await this.bookRepo.findOneBy({ id: record.bookId });

  if (!book) {
    throw new BadRequestException('Book not found');
  }

  book.availableQuantity += 1;
  await this.bookRepo.save(book);

  record.returned = true;
  return this.borrowRepo.save(record);
}
}