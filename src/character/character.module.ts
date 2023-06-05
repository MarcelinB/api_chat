import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character } from './character.entity';
import { UniversService } from 'src/univers/univers.service';
import { Univers } from 'src/univers/universe.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Univers, User])],
  controllers: [CharacterController],
  providers: [CharacterService, UniversService, UserService],
})
export class CharacterModule {}
