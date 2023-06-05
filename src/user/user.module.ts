import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Univers } from 'src/univers/universe.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Module({
  imports: [TypeOrmModule.forFeature([User, Univers])],
  controllers: [UserController],
  providers: [UserService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class UserModule {}
