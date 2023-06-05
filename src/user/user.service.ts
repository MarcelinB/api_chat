import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  create(user: User) {
    this.users.push(user);
  }
}