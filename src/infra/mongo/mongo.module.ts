import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `${
        process.env.ENV_DOCKER === 'RUNNING'
          ? process.env.NOSQLDB_URI_DOCKER
          : process.env.NOSQLDB_URI
      }`,
    ),
  ],
})
export class MongoModule {}
