import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character } from './character.entity';
import { UniversService } from 'src/univers/univers.service';
import { Univers } from 'src/univers/universe.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Univers, User])],
  controllers: [CharacterController],
  providers: [CharacterService, UniversService, UserService],
})
export class CharacterModule {}
