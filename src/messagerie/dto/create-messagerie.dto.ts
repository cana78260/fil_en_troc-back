import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateMessagerieDto {
  date: string;
  @IsString()
  @IsNotEmpty({
    message: ' *Le mail ne peut pas être vide.',
  })
  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  mail: string;
  @IsString({
    message: ' *Le département doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: ' *Remplissez le champ message.',
  })
  message: string;
}
