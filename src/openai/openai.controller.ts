import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OpenAIService } from './openai.service';

@Controller('openai')
@ApiBearerAuth()
@ApiTags('OpenAI') // Ajoute une étiquette "OpenAI" à la documentation Swagger
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Get('/createCompletion/:idCharacter/:idChat')
  @ApiOperation({ summary: 'Génère un message avec OpenAI' })
  @ApiResponse({ status: 200, description: 'Le message généré', type: String })
  async createCompletion(
    @Param('idCharacter') idCharacter: number,
    @Param('idChat') idChat: number
  ): Promise<any> {
    console.log(idCharacter, idChat);
    const generatedMessage = await this.openaiService.createCompletion(idCharacter, idChat);
    return generatedMessage;
  }
}
