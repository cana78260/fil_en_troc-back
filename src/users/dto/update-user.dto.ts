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
  @IsString({
    message: ' *Le nom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le nom ne peut pas être vide.',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le nom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  nom: string;

  @IsOptional()
  @IsString({
    message: ' *Le prénom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le prénom ne peut pas être vide.',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le prénom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le prénom doit contenir au moins un caractère ',
  })
  prenom: string;

  @IsOptional()
  @IsString({
    message: ' *Le pseudo doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Le pseudo ne peut pas être vide.',
  })
  @MinLength(1, {
    message: ' *Le pseudo doit contenir au moins deux caractère',
  })
  pseudo: string;

  @IsOptional()
  @IsInt()
  @Min(6, {
    message: ' *Vous devez avoir au moins 6ans pour vous inscrire sur le site',
  })
  @Max(120, { message: ' *Vous ne pouvez pas vous inscrire sur le site' })
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
  @IsString({
    message: ' *Le pseudo doit être une chaîne de caractères',
  })
  @MinLength(1, {
    message: ' *Votre adresse doit contenir au moins un caractère',
  })
  adresse: string;

  @IsOptional()
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

  @IsOptional()
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

  compte_temps?: number;
  moyenne_notes?: number;
  role?: Role;
}
