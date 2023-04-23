import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './application/user/user.module';
import { MongoModule } from './infra/mongo/mongo.module';
import { RabbitmqModule } from './infra/rabbitmq/rabbitmq.module';

@Module({
  imports: [ConfigModule.forRoot(), MongoModule, UserModule, RabbitmqModule],
})
export class AppModule {}
