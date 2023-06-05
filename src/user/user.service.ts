import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } };
    return this.userRepository.findOne(options);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.userRepository.findOne(options);
    if (user) {
      Object.assign(user, updateUserDto);
      return this.userRepository.save(user);
    }
    return null;
  }

  async remove(id: number): Promise<User | null> {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.userRepository.findOne(options);
    if (user) {
      await this.userRepository.remove(user);
      return user;
    }
    return null;
  }
}
