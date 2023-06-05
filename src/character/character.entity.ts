// character.entity.ts
import { Chat } from 'src/chat/chat.entity';
import { Univers } from 'src/univers/universe.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Univers, univers => univers.characters)
  univers: Univers;

  @ManyToMany(() => Chat, chat => chat.character)
  @JoinTable()
  chats: Chat[];
  
}
