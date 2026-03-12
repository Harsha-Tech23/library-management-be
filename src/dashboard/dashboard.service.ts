import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { Borrow } from '../borrow/borrow.entity';

@Injectable()
export class DashboardService {

constructor(
@InjectRepository(Book)
private bookRepo: Repository<Book>,

@InjectRepository(User)
private userRepo: Repository<User>,

@InjectRepository(Borrow)
private borrowRepo: Repository<Borrow>,
) {}

async getStats() {

const totalBooks = await this.bookRepo.count({
where: { isDeleted: false }
});

const totalUsers = await this.userRepo.count();

const borrowedBooks = await this.borrowRepo.count();

const usersBorrowed = await this.borrowRepo
.createQueryBuilder("borrow")
.select("COUNT(DISTINCT borrow.userId)", "count")
.getRawOne();

return {
totalBooks,
totalUsers,
borrowedBooks,
usersBorrowed: usersBorrowed.count
};

}

}
