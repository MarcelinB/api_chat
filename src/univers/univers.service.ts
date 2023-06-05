// univers.service.ts
import { Injectable } from '@nestjs/common';
import { Univers } from './universe.entity';


@Injectable()
export class UniversService {
  private readonly univers: Univers[] = [];

  findAll(): Univers[] {
    return this.univers;
  }

  create(univers: Univers) {
    this.univers.push(univers);
  }
}
