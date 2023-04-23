import { Test, TestingModule } from '@nestjs/testing';
import { NodemailerModule } from '../../infra/nodemailer/nodemailer.module';
import { InMemoryUserRepository } from './repositories/fakes/in-memory-user.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { RabbitmqModule } from '../../infra/rabbitmq/rabbitmq.module';

describe('UserService', () => {
  let service: UserService;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();

    const module: TestingModule = await Test.createTestingModule({
      imports: [NodemailerModule, RabbitmqModule],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: inMemoryUserRepository,
        },
        // {
        //   provide: 'NOTIFICATIONS',
        //   useFactory: () => {
        //     return ClientProxyFactory.create({
        //       transport: Transport.RMQ,
        //       options: {
        //         urls: [`amqp://root:rootpass@localhost:5672`],
        //         queue: 'notifications',
        //         queueOptions: {
        //           durable: true,
        //         },
        //       },
        //     });
        //   },
        // },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined service', async () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to find an user by api', async () => {
    const user = await inMemoryUserRepository.findOneApi(1);

    expect(user.data).toHaveProperty('id');
    expect(user.data).toHaveProperty('first_name');
    expect(user.data).toHaveProperty('last_name');
    expect(user.data).toHaveProperty('email');
  });

  it('should be able to find an user', async () => {
    await inMemoryUserRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123456',
    });

    const user = await inMemoryUserRepository.findOne('some-user-id');

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  it('should be able to update the avatar user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123456',
    });

    await inMemoryUserRepository.updateAvatar(user.id, 'avatar.png');

    const userUpdated = await inMemoryUserRepository.findOne(user.id);

    expect(userUpdated.avatar_file).toEqual('avatar.png');
  });

  it('should be able to remove the avatar user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123456',
    });

    await inMemoryUserRepository.removeAvatar(user.id);

    const userUpdated = await inMemoryUserRepository.findOne(user.id);

    expect(userUpdated.avatar_file).toEqual(null);
  });
});
