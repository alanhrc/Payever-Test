import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS',
        transport: Transport.RMQ,
        options: {
          urls: [
            `${
              process.env.ENV_DOCKER === 'RUNNING'
                ? process.env.RABBITMQ_URI_DOCKER
                : process.env.RABBITMQ_URI
            }`,
          ],
          queue: `${process.env.RABBITMQ_QUEUE}`,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: 'NOTIFICATIONS',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `${
                process.env.ENV_DOCKER === 'RUNNING'
                  ? process.env.RABBITMQ_URI_DOCKER
                  : process.env.RABBITMQ_URI
              }`,
            ],
            queue: `${process.env.RABBITMQ_QUEUE}`,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
  exports: [
    {
      provide: 'NOTIFICATIONS',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `${
                process.env.ENV_DOCKER === 'RUNNING'
                  ? process.env.RABBITMQ_URI_DOCKER
                  : process.env.RABBITMQ_URI
              }`,
            ],
            queue: `${process.env.RABBITMQ_QUEUE}`,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
})
export class RabbitmqModule {}
