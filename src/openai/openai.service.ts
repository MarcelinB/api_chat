import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequestPrompt, OpenAIApi } from 'openai';
import { CharacterService } from 'src/character/character.service';
import { MessageService } from 'src/message/message.service';


@Injectable()
export class OpenAIService {
  private openai: OpenAIApi;

  constructor(
    private readonly characterService: CharacterService,
    private readonly messageService: MessageService,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);

  }

  async createCompletion(): Promise<any> {
    const prompt = this.createPrompt(1, 1);
    const response = await this.openai.createCompletion({
        model: "text-ada-001",
        prompt: `${prompt}`,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["Human:", "AI:"],
      });
    return response;
  }

  async createPrompt(idCharacter: number, idChat: number): Promise<String> {
    const character = await this.characterService.findOne(idCharacter);
    const description = character.description;
    const messages = await this.messageService.findAllByChatId(idChat);
    let promptMessage = '';
  
    for (const message of messages) {
      if (message.isGPTGenerated) {
        promptMessage += 'AI: ';
      } else {
        promptMessage += 'Human: ';
      }
      promptMessage += message.content + '\n';
    }
  
    const prompt = `${description}\n\n${promptMessage} \n AI:  `;
    return prompt;
  }
}
