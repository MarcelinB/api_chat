export class UpdateMessageDto {
    readonly date?: Date;
    readonly content?: string;
    readonly isGPTGenerated?: boolean;
    readonly chatId?: number;
  }