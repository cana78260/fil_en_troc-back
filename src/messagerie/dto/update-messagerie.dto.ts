import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';
import { CreateMessagerieDto } from './create-messagerie.dto';

export class UpdateMessagerieDto {
  date: string;

  message: string;
  user: User;
}
