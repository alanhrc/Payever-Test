import { IUserApiProps } from 'src/utils/returnUserApi';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<Partial<UserEntity>>;
  abstract findOne(user_id: string): Promise<Partial<UserEntity> | null>;
  abstract findOneApi(user_id: number): Promise<IUserApiProps | null>;
  abstract updateAvatar(user_id: string, filename: string): Promise<void>;
  abstract removeAvatar(user_id: string): Promise<void>;
}
