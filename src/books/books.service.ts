import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll() {

    return this.bookRepository.find({
      where: { isDeleted: false }
    });

  }

  async create(bookData: any) {

    const book = this.bookRepository.create(bookData);

    return this.bookRepository.save(book);

  }

  async deleteBook(id: number) {

    const book = await this.bookRepository.findOne({
      where: { id }
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.isDeleted = true;

    return this.bookRepository.save(book);

  }

}

