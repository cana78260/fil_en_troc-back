import { User } from 'src/users/entities/user.entity';

export class CreateServiceDto {
  titre: string;

  localisation: string;

  creation: string;

  echeance: string;

  note: number;

  libelle: string;

  users: User;
}
