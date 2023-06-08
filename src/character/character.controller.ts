import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from 'src/dto/create-character.dto';
import { UpdateCharacterDto } from 'src/dto/update-character.dto';
import { Character } from './character.entity';

@Controller('characters')
@ApiBearerAuth()
@ApiTags('Characters') // Ajoute une étiquette "Characters" à la documentation Swagger
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère tous les personnages' })
  @ApiResponse({ status: 200, description: 'Liste de tous les personnages', type: Character, isArray: true })
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un personnage par son ID' })
  @ApiResponse({ status: 200, description: 'Le personnage', type: Character })
  findOne(@Param('id') id: number) {
    return this.characterService.findOne(id);
  }

  @Get('universe/:universeId')
  @ApiOperation({ summary: 'Récupère tous les personnages d\'un univers' })
  @ApiResponse({ status: 200, description: 'Liste de tous les personnages', type: Character, isArray: true })
  findAllByUniverseId(@Param('universeId') universeId: number) {
    return this.characterService.findAllByUniverseId(universeId);
  }

  @Post()
  @ApiOperation({ summary: 'Crée un nouveau personnage' })
  @ApiResponse({ status: 201, description: 'Le personnage a été créé avec succès', type: Character })
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un personnage' })
  @ApiResponse({ status: 200, description: 'Le personnage a été mis à jour avec succès', type: Character })
  update(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un personnage' })
  @ApiResponse({ status: 200, description: 'Le personnage a été supprimé avec succès' })
  remove(@Param('id') id: number) {
    return this.characterService.remove(id);
  }
}
