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
    type: 'text',
  })
  message: string;

  @ManyToOne(() => User, (users) => users.message, { eager: false })
  users: User;
}
