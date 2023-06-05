import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Message } from 'src/message/message.entity';
import { CharacterService } from 'src/character/character.service';
import { Character } from 'src/character/character.entity';
import { UniversService } from 'src/univers/univers.service';
import { Univers } from 'src/univers/universe.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, Character, Univers, User])],
  controllers: [ChatController],
  providers: [ChatService, CharacterService, UniversService, UserService],
})
export class ChatModule {}
