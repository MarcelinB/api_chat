import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  private readonly messages: Message[] = [];

  findAll(): Message[] {
    return this.messages;
  }

  create(message: Message) {
    this.messages.push(message);
  }
}