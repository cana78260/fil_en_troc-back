import { User } from 'src/users/entities/user.entity';

export class CreateMessagerieDto {
  date: string;

  message: string;
  user: User;
}
