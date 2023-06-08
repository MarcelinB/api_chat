import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/dto/create-message.dto';
import { UpdateMessageDto } from 'src/dto/update-message.dto';
import { Message } from './message.entity';

@Controller('messages')
@ApiBearerAuth()
@ApiTags('Messages') // Ajoute une étiquette "Messages" à la documentation Swagger
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère tous les messages' })
  @ApiResponse({ status: 200, description: 'Liste des messages', type: [Message] })
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un message par son ID' })
  @ApiResponse({ status: 200, description: 'Le message récupéré', type: Message })
  findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @Get('chat/:chatId/messages')
  @ApiOperation({ summary: 'Récupère tous les messages d\'un chat' })
  @ApiResponse({ status: 200, description: 'Liste des messages du chat', type: [Message] })
  findAllByChatId(@Param('chatId') chatId: number) {
    return this.messageService.findAllByChatId(chatId);
  }

  @Post()
  @ApiOperation({ summary: 'Crée un nouveau message' })
  @ApiResponse({ status: 201, description: 'Le message créé', type: Message })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un message par son ID' })
  @ApiResponse({ status: 200, description: 'Le message mis à jour', type: Message })
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un message par son ID' })
  @ApiResponse({ status: 200, description: 'Le message supprimé' })
  remove(@Param('id') id: number) {
    return this.messageService.remove(id);
  }
}
