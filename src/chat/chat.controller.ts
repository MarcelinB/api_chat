import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from 'src/dto/create-chat.dto';
import { UpdateChatDto } from 'src/dto/update-chat.dto';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chatService.findOne(id);
  }

  @Get('character/:characterId')
  findAllByCharacterId(@Param('characterId') characterId: number) {
    return this.chatService.findAllByCharacterId(characterId);
  }

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chatService.remove(id);
  }
}
