import { Controller, Get, Param } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Get('/createCompletion/:idCharacter/:idChat')
  async createCompletion(
    @Param('idCharacter') idCharacter: number,
    @Param('idChat') idChat: number
  ): Promise<any> {
    console.log(idCharacter, idChat);
    const generatedMessage = await this.openaiService.createCompletion(idCharacter, idChat);
    return generatedMessage;
  }
}