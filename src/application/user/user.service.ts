import { unlink } from 'node:fs/promises';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { readFileSync, stat } from 'node:fs';
import { UserRepository } from './repositories/user.repository';
import { NodemailerService } from '../../infra/nodemailer/nodemailer.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private nodeMailerService: NodemailerService,
    @Inject('NOTIFICATIONS') private client: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    if (user) {
      this.client.emit('new-user', {
        notification: 'new user',
        message: `Welcome ${user.name}`,
      });

      this.nodeMailerService.sendEmail(user.email, `Welcome!! ${user.name}`);
    }

    return { user };
  }

  async findOne(user_id: number) {
    const userFound = await this.userRepository.findOneApi(user_id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const user = {
      name: `${userFound.data.first_name} ${userFound.data.last_name}`,
      email: userFound.data.email,
    };

    return { user };
  }

  async uploadAvatar(user_id: string, file: Express.Multer.File) {
    const user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new Error('User not found!');
    }

    const path = process.cwd() + '/uploads/' + `${user.avatar_file}`;

    stat(`${path}`, async (error) => {
      if (error) {
        console.log('Image avatar not found!');
      } else {
        await unlink(`${path}`);
      }
    });

    await this.userRepository.updateAvatar(user_id, file.filename);

    const newPath = process.cwd() + '/uploads/' + `${file.filename}`;

    const contents = readFileSync(newPath);

    const encoded = Buffer.from(contents).toString('base64');

    return encoded;
  }

  async remove(user_id: string) {
    const user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new Error('User not found!');
    }

    const path = process.cwd() + '/uploads/' + `${user.avatar_file}`;

    stat(`${path}`, async (error) => {
      if (error) {
        console.log('Image avatar not found!');
      } else {
        await unlink(`${path}`);
      }
    });

    await this.userRepository.removeAvatar(user_id);

    return;
  }
}
