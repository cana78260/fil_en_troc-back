import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto {
  titre?: string;

  localisation?: string;

  creation?: string;

  echeance?: string;

  note?: number;

  libelle?: string;
}
