import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from 'src/dto/create-chat.dto';
import { UpdateChatDto } from 'src/dto/update-chat.dto';
import { Chat } from './chat.entity';

@Controller('chat')
@ApiBearerAuth()
@ApiTags('Chat') // Ajoute une étiquette "Chat" à la documentation Swagger
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère tous les chats' })
  @ApiResponse({ status: 200, description: 'Liste des chats', type: [Chat] })
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un chat par son ID' })
  @ApiResponse({ status: 200, description: 'Le chat récupéré', type: Chat })
  findOne(@Param('id') id: number) {
    return this.chatService.findOne(id);
  }

  @Get('character/:characterId')
  @ApiOperation({ summary: 'Récupère tous les chats d\'un personnage' })
  @ApiResponse({ status: 200, description: 'Liste des chats du personnage', type: [Chat] })
  findAllByCharacterId(@Param('characterId') characterId: number) {
    return this.chatService.findAllByCharacterId(characterId);
  }

  @Post()
  @ApiOperation({ summary: 'Crée un nouveau chat' })
  @ApiResponse({ status: 201, description: 'Le chat créé', type: Chat })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un chat par son ID' })
  @ApiResponse({ status: 200, description: 'Le chat mis à jour', type: Chat })
  update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un chat par son ID' })
  @ApiResponse({ status: 200, description: 'Le chat supprimé' })
  remove(@Param('id') id: number) {
    return this.chatService.remove(id);
  }
}
