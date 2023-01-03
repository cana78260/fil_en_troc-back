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
  titre: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  categories: string;

  @OneToMany(() => Service, (services) => services.categorie, {
    eager: false,
  })
  service!: Service;
}
