import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from 'src/role/entities/role.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le nom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  nom: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le prénom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le prénom doit contenir au moins un caractère ',
  })
  prenom: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1, {
    message: ' *Le pseudo doit contenir au moins deux caractère',
  })
  pseudo: string;

  @IsOptional()
  @IsInt()
  @Min(6)
  @Max(120)
  age: number;

  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: ' *Vous devez rentrer 5 caractères',
  })
  @MaxLength(5, {
    message: ' *Vous ne pouvez entrer que 5 caractères maximum.',
  })
  genre: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: ' *Votre adresse doit contenir au moins un caractère',
  })
  adresse: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({
    message: ' *La ville ne peut pas être vide.',
  })
  @MinLength(1, {
    message: ' *La ville doit contenir au moins un caractère',
  })
  cp_ville: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  @IsString()
  mail: string;

  @IsOptional()
  @IsString()
  @MinLength(4, {
    message: '*Le mot de passe doit contenir au moins 4 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  mot_de_passe: string;

  heures_offertes?: number;
  heures_recues?: number;
  moyenne_notes?: number;
  role?: Role;
}
