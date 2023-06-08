import { Controller, Get } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Get('/createCompletion')
  async createCompletion(): Promise<any> {
    const test =  await this.openaiService.createCompletion();
    console.log(test);
    return test;
    
  }
}