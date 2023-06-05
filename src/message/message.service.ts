import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from 'src/dto/create-message.dto';
import { UpdateMessageDto } from 'src/dto/update-message.dto';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatService: ChatService, 
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    const options = { where: { id } };
    return this.messageRepository.findOne(options);
  }

  async findAllByChatId(chatId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { chat: { id: chatId } },
      relations: ['chat'],
    });
  }
  

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { chatId, ...messageData } = createMessageDto;
  
    const chat = await this.chatService.findOne(chatId); // Assurez-vous d'importer et d'injecter le service ChatService
  
    const newMessage = this.messageRepository.create({
      ...messageData,
      chat,
    });
  
    return this.messageRepository.save(newMessage);
  }
  

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.findOne(id);
    if (message) {
      Object.assign(message, updateMessageDto);
      return this.messageRepository.save(message);
    }
    return null;
  }

  async remove(id: number): Promise<boolean> {
    const message = await this.findOne(id);
    if (message) {
      await this.messageRepository.remove(message);
      return true;
    }
    return false;
  }
}