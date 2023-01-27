import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  intitule: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  image: string;

  @OneToMany(() => Service, (services) => services.categorie, {
    eager: false,
  })
  service: Service;
}
