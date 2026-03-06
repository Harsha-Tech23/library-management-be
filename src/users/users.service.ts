import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: any) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id }
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email }
    });
  }

  async resetPassword(id: number, newPassword: string) {

  return this.userRepository.update(id, {
    password: newPassword
  });

}

}

