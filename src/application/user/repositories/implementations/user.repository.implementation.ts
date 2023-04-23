import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IUserApiProps, ReturnUserApi } from 'src/utils/returnUserApi';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserRepositoryImplementation implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar_file: true,
      },
    });

    return user;
  }

  async findOne(user_id: string): Promise<Partial<UserEntity> | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  async findOneApi(user_id: number): Promise<IUserApiProps | null> {
    const user = await ReturnUserApi(user_id);

    return user;
  }

  async updateAvatar(user_id: string, filename: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        avatar_file: filename,
      },
    });
  }

  async removeAvatar(user_id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        avatar_file: null,
      },
    });
  }
}
