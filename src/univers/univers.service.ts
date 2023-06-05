import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Univers } from './universe.entity';
import { CreateUniversDto } from 'src/dto/create-univers.dto';
import { UpdateUniversDto } from 'src/dto/update-univers.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class UniversService {
  constructor(
    @InjectRepository(Univers)
    private readonly universRepository: Repository<Univers>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Univers[]> {
    return this.universRepository.find();
  }

  async findOne(id: number): Promise<Univers> {
    const options = { where: { id } };
    const univers = await this.universRepository.findOne(options);
    if (!univers) {
      throw new NotFoundException('Univers not found');
    }
    return univers;
  }

  async findAllByUserId(userId: number): Promise<Univers[]> {
    return this.universRepository
      .createQueryBuilder('univers')
      .where('univers.user = :userId', { userId })
      .getMany();
  }

  async create(createUniversDto: CreateUniversDto): Promise<Univers> {
    const user = await this.userService.findOne(createUniversDto.user);
    if (!user) {
      throw new Error('User not found');
    }
  
    const newUnivers = new Univers();
    newUnivers.name = createUniversDto.name;
    newUnivers.user = user;
  
    return this.universRepository.save(newUnivers);
  }

  async update(id: number, updateUniversDto: UpdateUniversDto): Promise<Univers> {
    const options = { where: { id } };
    const univers = await this.universRepository.findOne(options);
    if (!univers) {
      // Gérer le cas où l'univers n'existe pas
      throw new Error('Univers not found');
    }
    const updatedUnivers = { ...univers, ...updateUniversDto };
    return this.universRepository.save(updatedUnivers);
  }

  async remove(id: number): Promise<Univers | null> {
    const options = { where: { id } };
    const existingUnivers = await this.universRepository.findOne(options);
    if (existingUnivers) {
      await this.universRepository.remove(existingUnivers);
      return existingUnivers;
    }
    return null;
  }
}
