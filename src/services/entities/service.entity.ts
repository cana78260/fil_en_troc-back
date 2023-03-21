import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  titre: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  localisation: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  departement: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  creation: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  echeance: string;

  @Column({
    nullable: true,
    type: 'float',
  })
  note: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  libelle: string;

  @ManyToOne(() => User, (users) => users.serviceCreé, {
    eager: true,
  })
  createur: User;

  @ManyToOne(() => User, (users) => users.serviceReservé, {
    eager: true,
  })
  client: User;

  @ManyToOne(() => Category, (categorie) => categorie.service, {
    eager: true,
  })
  categorie: Category[];
}
