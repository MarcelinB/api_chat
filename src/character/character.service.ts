import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { CreateCharacterDto } from 'src/dto/create-character.dto';
import { UpdateCharacterDto } from 'src/dto/update-character.dto';
import { UniversService } from 'src/univers/univers.service';


@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly universeService: UniversService,
  ) {}

  async findAll(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  async findOne(id: number): Promise<Character> {
    const options = { where: { id } };
    return this.characterRepository.findOne(options);
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const { universId, ...characterData } = createCharacterDto;
  
    const universe = await this.universeService.findOne(universId);
  
    const newCharacter = this.characterRepository.create({
      ...characterData,
      univers: universe,
    });
  
    return this.characterRepository.save(newCharacter);
  }

  async findAllByUniverseId(universeId: number): Promise<Character[]> {
    return this.characterRepository.find({
      where: { univers: { id: universeId } },
      relations: ['univers', 'chats'],
    });
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const character = await this.findOne(id);
    if (character) {
      Object.assign(character, updateCharacterDto);
      return this.characterRepository.save(character);
    }
    return null;
  }

  async remove(id: number): Promise<boolean> {
    const character = await this.findOne(id);
    if (character) {
      await this.characterRepository.remove(character);
      return true;
    }
    return false;
  }
}
