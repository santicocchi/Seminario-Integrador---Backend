import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '../jwt/jwt.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn().mockImplementation(dto => Object.assign(new UserEntity(), dto)),
      save: jest.fn().mockImplementation(user => Promise.resolve({ ...user, id: 1 })),
      findOne: jest.fn().mockResolvedValue(null), 
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepo,
        },
        {
          provide: JwtService,
          useValue: {
            generateToken: jest.fn(),
            refreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { email: 'test@example.com', password: '123456' };
    const result = await service.register(dto as any);
    expect(mockRepo.create).toHaveBeenCalledWith(expect.objectContaining(dto));
    expect(mockRepo.save).toHaveBeenCalled();
    expect(result.status).toBe('created');
  });

  it('should not create a user if email exists', async () => {
    mockRepo.findOne.mockResolvedValueOnce({ id: 2, email: 'duplicate@example.com',
     password: 'hashed' });
    await expect(service.register({ email: 'duplicate@example.com', password: '123456' }))
      .rejects.toThrowError('Email is already in use');
  });
});