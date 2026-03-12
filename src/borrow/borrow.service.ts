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

  async create(body: any) {

    const borrow = new Borrow();

    borrow.userId = body.userId;
    borrow.bookId = body.bookId;
    borrow.bookName = body.bookName;
    borrow.bookAuthor = body.bookAuthor;
    borrow.isbn = body.isbn;

    return await this.borrowRepo.save(borrow);

  }
  async getAllBorrows(){
  return await this.borrowRepo.find()
}

  async getUserBorrows(userId: number) {
    return await this.borrowRepo.find({
      where: { userId: userId }
    });

  }

  async remove(id: number) {

    return await this.borrowRepo.delete(id);

  }

}
