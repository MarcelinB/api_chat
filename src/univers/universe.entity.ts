
import { Character } from 'src/character/character.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Univers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.univers)
  user: User;

  @OneToMany(() => Character, character => character.univers)
  characters: Character[];

}
