import { Character } from "src/character/character.entity";
import { User } from "src/user/user.entity";

export class CreateUniversDto {
    readonly name: string;
    readonly user: number; // Vous pouvez ajuster ce champ en fonction de vos besoins
  }