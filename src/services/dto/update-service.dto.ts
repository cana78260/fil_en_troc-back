import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto {
  @IsOptional()
  @IsString({
    message: ' *Le titre doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le titre ne peut pas être vide.',
  })
  @MinLength(1, {
    message: ' *Le titre doit contenir au moins un caractère',
  })
  titre?: string;

  @IsOptional()
  @IsString({
    message: ' *La localité doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *La localité ne peut pas être vide.',
  })
  @MinLength(1, {
    message: ' *La localité doit contenir au moins un caractère',
  })
  localisation?: string;

  @IsOptional()
  @IsString({
    message: ' *Le département doit être une chaîne de caractères',
  })
  @MinLength(3, {
    message: ' *Le département doit contenir au moins trois caractères',
  })
  departement?: string;

  creation?: string;

  @IsOptional()
  echeance?: string;

  note?: number;

  @IsOptional()
  @IsString({
    message: ' *Le libellé doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le libellé ne peut pas être vide.',
  })
  libelle?: string;

  createur: User;

  @IsOptional()
  categorie: Category[];
}
