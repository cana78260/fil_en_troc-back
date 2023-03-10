import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateServiceDto {
  @IsString({
    message: ' *Le titre doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le titre ne peut pas être vide.',
  })
  @MinLength(1, {
    message: ' *Le titre doit contenir au moins un caractère',
  })
  titre: string;

  @IsString({
    message: ' *La localité doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *La localité ne peut pas être vide.',
  })
  @MinLength(1, {
    message: ' *La localité doit contenir au moins un caractère',
  })
  localisation: string;

  @IsString({
    message: ' *Le département doit être une chaîne de caractères',
  })
  @MinLength(3, {
    message: ' *Le département doit contenir au moins trois caractères',
  })
  departement?: string;

  creation: string;

  echeance: string;

  note: number;
  @IsString({
    message: ' *Le libellé doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le libellé ne peut pas être vide.',
  })
  libelle: string;

  client: User;

  createur: User;
  @IsNotEmpty({
    message: ' *Vous devez sélectionner une catégorie.',
  })
  category?: Category;
}
