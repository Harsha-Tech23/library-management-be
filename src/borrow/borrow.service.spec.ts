import { Test, TestingModule } from '@nestjs/testing';
import { BorrowService } from './borrow.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Borrow } from './borrow.entity';

describe('BorrowService', () => {
  let service: BorrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowService,
        {
          provide: getRepositoryToken(Borrow),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BorrowService>(BorrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
