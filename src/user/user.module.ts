import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Univers } from 'src/univers/universe.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Univers])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
