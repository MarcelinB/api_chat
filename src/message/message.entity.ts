// message.entity.ts
import { Chat } from 'src/chat/chat.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ length: 1000 })
  content: string;

  @Column()
  isGPTGenerated: boolean;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;
  
}
