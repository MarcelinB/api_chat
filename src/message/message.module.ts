import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { Chat } from 'src/chat/chat.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
