import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Messagerie {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  date: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  mail: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  message: string;
}
