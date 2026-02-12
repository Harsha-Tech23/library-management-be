import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

   async create(data: Partial<Book>) {
  const book = this.bookRepository.create({
    ...data,
    availableQuantity: data.quantity,
  });

  try {
    return await this.bookRepository.save(book);
  } catch (error) {
    if (error?.code === '23505') {
      throw new BadRequestException('ISBN already exists');
    }

    console.log(error); 
    throw new BadRequestException('Something went wrong');
  }
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Book>) {
    await this.bookRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.bookRepository.delete(id);
    return { message: 'Book deleted successfully' };
  }
}

