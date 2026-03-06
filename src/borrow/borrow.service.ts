import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';

@Injectable()
export class BorrowService {

  constructor(
    @InjectRepository(Borrow)
    private borrowRepo: Repository<Borrow>,
  ) {}

  async borrowBook(data: any) {
    const borrow = this.borrowRepo.create(data);
    return this.borrowRepo.save(borrow);
  }

  async getBorrowedBooks(userId: number) {
    return this.borrowRepo.find({
      where: { userId }
    });
  }

  async returnBook(id: number) {
    return this.borrowRepo.update(id, {
      status: 'RETURNED'
    });
  }

}
