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
  ville: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  departement: string;

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
  compte_temps: number;

  @Column({
    nullable: false,
    type: 'float',
  })
  moyenne_notes: number;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Service, (services) => services.createur, { eager: false })
  services: Service[];

  @OneToMany(() => Service, (services) => services.client, { eager: true })
  client: Service[];

  @OneToMany(() => Messagerie, (message) => message.users, { eager: true })
  message: Messagerie[];
}
