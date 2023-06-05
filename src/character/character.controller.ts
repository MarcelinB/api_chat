import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from 'src/dto/create-character.dto';
import { UpdateCharacterDto } from 'src/dto/update-character.dto';


@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.characterService.findOne(id);
  }

  @Get('universe/:universeId')
  findAllByUniverseId(@Param('universeId') universeId: number) {
    return this.characterService.findAllByUniverseId(universeId);
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.characterService.remove(id);
  }
}
