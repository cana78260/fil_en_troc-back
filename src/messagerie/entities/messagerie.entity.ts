import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    length: 255,
  })
  message: string;

  @OneToMany(() => User, (users) => users.messages, { eager: true })
  users!: User[];
}
