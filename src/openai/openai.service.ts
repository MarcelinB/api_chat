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
      apiKey: ``,
    });
    this.openai = new OpenAIApi(configuration);

  }

  async createCompletion(idCharacter: number, idChat: number): Promise<any> {
    const prompt = await this.createPrompt(idCharacter, idChat);
    const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["Human:", "AI:"],
      });

    const generatedMessage = response.data.choices[0].text;
    console.log(generatedMessage);
    await this.messageService.create({
      date: new Date(),
      content: generatedMessage,
      isGPTGenerated: true,
      chatId: 1,
    });
    return generatedMessage;
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
  
    const prompt = `${description}\n\n Dans le cadre d'un jeu de rôle, l'IA devient le personnage de "${character.name}" et répond à l'humain. \n 
    ${promptMessage} \n AI:  `; 

    console.log(prompt);
    return prompt;
  }
}
