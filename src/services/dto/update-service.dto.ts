import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto {
  titre?: string;

  localisation?: string;

  departement?: string;

  creation?: string;

  echeance?: string;

  note?: number;

  libelle?: string;

  createur: User;
}
