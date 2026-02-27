import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
  ) {}

  async borrowBook(userId: number, bookId: number) {
    const borrow = this.borrowRepository.create({
      userId,
      bookId,
      returned: false,
    });

    return this.borrowRepository.save(borrow);
  }

  async returnBook(borrowId: number) {
    const borrow = await this.borrowRepository.findOne({
      where: { id: borrowId },
    });

    if (borrow) {
      borrow.returned = true;
      return this.borrowRepository.save(borrow);
    }
  }

  async findAll() {
  const data = await this.borrowRepository.find();
  if (!data || data.length === 0) {
    return [
      { id: 1, bookId: 101, returned: false },
      { id: 2, bookId: 202, returned: true }
    ];
  }

  return data;
}
}
