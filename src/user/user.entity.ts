// user.entity.ts
import { Chat } from 'src/chat/chat.entity';
import { Univers } from 'src/univers/universe.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Univers, univers => univers.user)
  univers: Univers[];

}
