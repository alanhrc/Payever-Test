import { Injectable } from '@nestjs/common';
import { IUserApiProps } from 'src/utils/returnUserApi';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: UserEntity[] = [];

  async create(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const newUser = new UserEntity();

    Object.assign(
      newUser,
      { id: 'some-user-id' },
      {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        avatar_file: null,
      },
    );

    this.users.push(newUser);

    return newUser;
  }

  async findOne(user_id: string): Promise<Partial<UserEntity> | null> {
    return this.users.find((user) => user.id === user_id);
  }

  async findOneApi(user_id: number): Promise<IUserApiProps | null> {
    return {
      data: {
        id: user_id,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
      },
    };
  }

  async updateAvatar(user_id: string, filename: string): Promise<void> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user_id,
    );
    const user = this.users.find((user) => user.id === user_id);

    user.avatar_file = filename;

    this.users[findIndex] = user;
  }

  async removeAvatar(user_id: string): Promise<void> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user_id,
    );
    const user = this.users.find((user) => user.id === user_id);

    user.avatar_file = null;

    this.users[findIndex] = user;
  }
}
