import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/dto/create-message.dto';
import { UpdateMessageDto } from 'src/dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @Get('chat/:chatId/messages')
  findAllByChatId(@Param('chatId') chatId: number) {
  return this.messageService.findAllByChatId(chatId);
}


  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messageService.remove(id);
  }
}