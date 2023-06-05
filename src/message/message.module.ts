import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { Chat } from 'src/chat/chat.entity';
import { ChatService } from 'src/chat/chat.service';
import { CharacterService } from 'src/character/character.service';
import { Character } from 'src/character/character.entity';
import { UniversService } from 'src/univers/univers.service';
import { Univers } from 'src/univers/universe.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, Character, Univers, User])],
  controllers: [MessageController],
  providers: [MessageService, ChatService, CharacterService, UniversService, UserService],
})
export class MessageModule {}
