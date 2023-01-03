import { Messagerie } from 'src/messagerie/entities/messagerie.entity';
import { Role } from 'src/role/entities/role.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  nom: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  prenom: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  pseudo: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  age: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  genre: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  adresse: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  cp_ville: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  mail: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  mot_de_passe: string;

  @Column({
    nullable: false,
    type: 'float',
  })
  heures_offertes: number;

  @Column({
    nullable: false,
    type: 'float',
  })
  heures_recues: number;

  @Column({
    nullable: false,
    type: 'float',
  })
  moyenne_notes: number;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Service, (services) => services.users, { eager: true })
  services!: Service[];
  messages: any;

  @ManyToOne(() => Messagerie, (message) => message.users, { eager: false })
  message!: Messagerie[];
}
