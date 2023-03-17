import { Role } from 'src/role/entities/role.entity';
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

export class CreateAuthDto {
  @IsString({
    message: ' *Le nom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le nom ne peut pas être vide.',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: " *Le nom ne doit pas contenir d'espaces",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère',
  })
  nom: string;
  // @IsString()

  @IsString({
    message: ' *Le prénom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le prénom ne peut pas être vide.',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: " *Le prénom ne doit pas contenir d'espaces",
  })
  @MinLength(2, {
    message: ' *Le prénom doit contenir au moins deux caractère',
  })
  prenom: string;

  @IsString({
    message: ' *Le pseudo doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le pseudo ne peut pas être vide.',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: " *Le pseudo ne doit pas contenir d'espaces",
  })
  @MinLength(1, {
    message: ' *Le pseudo doit contenir au moins deux caractère',
  })
  pseudo: string;

  @IsInt({
    message: ' *Vous devez entrer un chiffre dans le champ age',
  })
  @Min(16, {
    message:
      ' *Vous devez avoir au moins 16 ans pour vous inscrire sur le site',
  })
  @Max(120, { message: ' *Vous ne pouvez pas vous inscrire sur le site' })
  age: number;

  @IsString()
  @MinLength(1, {
    message: ' *Vous devez rentrer au moins 1   caractère dans le champ genre',
  })
  genre: string;

  @IsString({
    message: ' *Votre adresse doit être une chaîne de caractères',
  })
  @MinLength(1, {
    message: ' *Votre adresse doit contenir au moins un caractère',
  })
  adresse: string;

  @IsString({
    message: ' *La ville doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *La ville ne peut pas être vide.',
  })
  @MinLength(1, {
    message: ' *La ville doit contenir au moins un caractère',
  })
  ville: string;
  @IsString({
    message: ' *Le département doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le département ne peut pas être vide.',
  })
  @MinLength(3, {
    message: ' *Le département doit contenir au moins trois caractères',
  })
  departement: string;

  @IsString()
  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  mail: string;

  @IsString()
  @MinLength(4, {
    message: '*Le mot de passe doit contenir au moins 4 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  mot_de_passe: string;
  @IsOptional()
  compte_temps: number;
  @IsOptional()
  moyenne_notes: number;
  role?: Role;
}
