import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Consumer rabbit
  app.connectMicroservice<MicroserviceOptions>({
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

  await app.startAllMicroservices();

  await app.listen(process.env.API_NEST_PORT || 3333);
}
bootstrap();
