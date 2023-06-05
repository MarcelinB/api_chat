import { Message } from "src/message/message.entity";

export class CreateChatDto {
  readonly characterId: number;
  readonly messages?: Message[];
}
