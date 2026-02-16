import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Borrow {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @Column({ default: false })
  returned: boolean;
}
