import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Borrow {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @Column()
  bookName: string;

  @Column()
  bookAuthor: string;

  @Column()
  isbn: string;

  @Column({ default: 'BORROWED' })
  status: string;

}
