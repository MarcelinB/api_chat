import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UniversService } from './univers.service';
import { CreateUniversDto } from 'src/dto/create-univers.dto';
import { UpdateUniversDto } from 'src/dto/update-univers.dto';


@Controller('univers')
export class UniversController {
  constructor(private readonly universService: UniversService) {}

  @Get()
  findAll() {
    return this.universService.findAll();
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: number) {
    return this.universService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.universService.findOne(id);
  }

  @Post()
  create(@Body() createUniversDto: CreateUniversDto) {
    return this.universService.create(createUniversDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUniversDto: UpdateUniversDto) {
    return this.universService.update(+id, updateUniversDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universService.remove(+id);
  }
}
