// chat.service.ts
import { Injectable } from '@nestjs/common';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  private readonly chats: Chat[] = [];

  findAll(): Chat[] {
    return this.chats;
  }

  create(chat: Chat) {
    this.chats.push(chat);
  }
}
