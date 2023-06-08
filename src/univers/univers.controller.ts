import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UniversService } from './univers.service';
import { CreateUniversDto } from 'src/dto/create-univers.dto';
import { UpdateUniversDto } from 'src/dto/update-univers.dto';
import { Univers } from './universe.entity';

@Controller('univers')
@ApiBearerAuth()
@ApiTags('Univers') // Ajoute une étiquette "Univers" à la documentation Swagger
export class UniversController {
  constructor(private readonly universService: UniversService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère tous les univers' })
  @ApiResponse({ status: 200, description: 'Liste des univers', type: [Univers] })
  findAll() {
    return this.universService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupère tous les univers d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des univers de l\'utilisateur', type: [Univers] })
  findAllByUserId(@Param('userId') userId: number) {
    return this.universService.findAllByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un univers par son ID' })
  @ApiResponse({ status: 200, description: 'L\'univers récupéré', type: Univers })
  findOne(@Param('id') id: number) {
    return this.universService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crée un nouvel univers' })
  @ApiResponse({ status: 201, description: 'L\'univers créé', type: Univers })
  create(@Body() createUniversDto: CreateUniversDto) {
    return this.universService.create(createUniversDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un univers par son ID' })
  @ApiResponse({ status: 200, description: 'L\'univers mis à jour', type: Univers })
  update(@Param('id') id: string, @Body() updateUniversDto: UpdateUniversDto) {
    return this.universService.update(+id, updateUniversDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un univers par son ID' })
  @ApiResponse({ status: 200, description: 'L\'univers supprimé' })
  remove(@Param('id') id: string) {
    return this.universService.remove(+id);
  }
}
