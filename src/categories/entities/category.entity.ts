import { Service } from 'src/services/entities/service.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Service, (services) => services.categorie, {
    eager: false,
  })
  service!: Service;
}
