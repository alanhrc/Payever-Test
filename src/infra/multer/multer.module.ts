import { Module } from '@nestjs/common';
import { MulterModule as MulterModuleNestjs } from '@nestjs/platform-express';
import { MulterController } from './multer.controller';

@Module({
  imports: [
    MulterModuleNestjs.register({
      dest: process.cwd() + '/uploads',
    }),
  ],
  controllers: [MulterController],
})
export class MulterModule {}
