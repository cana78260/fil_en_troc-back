import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

export class UpdateServiceDto {
  titre?: string;

  localisation?: string;

  departement?: string;

  creation?: string;

  echeance?: string;

  note?: number;

  libelle?: string;

  createur: User;

  categorie: Category[];
}
