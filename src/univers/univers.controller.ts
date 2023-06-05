import { Controller, Get } from '@nestjs/common';
import { UniversService } from './univers.service';

@Controller('univers')
export class UniversController {
  constructor(private readonly universService: UniversService) {}

  @Get()
  findAll() {
    return this.universService.findAll();
  }
}
