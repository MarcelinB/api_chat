import { Character } from 'src/character/character.entity';
import { Message } from 'src/message/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

  @ManyToOne(() => Character, character => character.chats)
  character: Character;

}