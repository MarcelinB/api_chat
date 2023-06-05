import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversController } from './univers.controller';
import { UniversService } from './univers.service';
import { Univers } from './universe.entity';
import { User } from 'src/user/user.entity';
import { Character } from 'src/character/character.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Univers, User, Character])],
  controllers: [UniversController],
  providers: [UniversService],
})
export class UniversModule {}
