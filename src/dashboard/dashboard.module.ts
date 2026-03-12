import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { Borrow } from '../borrow/borrow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Borrow])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
