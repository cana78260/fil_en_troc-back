import { Role } from 'src/role/entities/role.entity';

export class CreateAuthDto {
  nom: string;
  prenom: string;
  pseudo: string;
  age: number;
  genre: string;
  adresse: string;
  cp_ville: string;
  mail: string;
  mot_de_passe: string;
  heures_offertes: number;
  heures_recues: number;
  moyenne_notes: number;
  role?: Role;
}
