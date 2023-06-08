import { Module } from '@nestjs/common';
import { OpenAIController } from './openai.controller';
import { OpenAIService } from './openai.service';
import { CharacterService } from 'src/character/character.service';
import { MessageService } from 'src/message/message.service';
import { Character } from 'src/character/character.entity';
import { Message } from 'src/message/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversService } from 'src/univers/univers.service';
import { Univers } from 'src/univers/universe.entity';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/chat.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';


@Module({
  imports:  [TypeOrmModule.forFeature([Message, Character, Univers, Chat, User])],
  controllers: [OpenAIController],
  providers: [OpenAIService, CharacterService, MessageService, UniversService, ChatService, UserService],
})
export class OpenAIModule {}