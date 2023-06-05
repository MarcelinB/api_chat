import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatDto } from 'src/dto/create-chat.dto';
import { UpdateChatDto } from 'src/dto/update-chat.dto';
import { CharacterService } from '../character/character.service';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly characterService: CharacterService,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const { characterId, messages } = createChatDto;
  
    const character = await this.characterService.findOne(characterId);
  
    const chat = new Chat();
    chat.character = character;
    chat.messages = messages || [];
  
    return this.chatRepository.save(chat);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  async findOne(id: number): Promise<Chat> {
    const options = { where: { id } };
    return this.chatRepository.findOne(options);
  }

  async findAllByCharacterId(characterId: number): Promise<Chat[]> {
    return this.chatRepository.find({
      where: { character: { id: characterId } },
      relations: ['character', 'messages'],
    });
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const options = { where: { id } };
    const chat = await this.chatRepository.findOne(options);
    if (!chat) {
      // Handle error if chat not found
    }
    Object.assign(chat, updateChatDto);
    return this.chatRepository.save(chat);
  }

  async remove(id: number): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
