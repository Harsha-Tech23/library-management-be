import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockBookRepository = {};
  const mockUserRepository = {};
  const mockBorrowRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: 'BookRepository', useValue: mockBookRepository },
        { provide: 'UserRepository', useValue: mockUserRepository },
        { provide: 'BorrowRepository', useValue: mockBorrowRepository },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
