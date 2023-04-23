import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../database/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { UserRepositoryImplementation } from './repositories/implementations/user.repository.implementation';
import { NodemailerModule } from 'src/infra/nodemailer/nodemailer.module';
import { MulterModule } from 'src/infra/multer/multer.module';
import { RabbitmqModule } from 'src/infra/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule, NodemailerModule, MulterModule],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
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
    {
      provide: UserRepository,
      useClass: UserRepositoryImplementation,
    },
  ],
})
export class UserModule {}
