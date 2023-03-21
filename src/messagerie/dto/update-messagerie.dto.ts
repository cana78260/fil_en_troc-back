import { User } from 'src/users/entities/user.entity';

export class UpdateMessagerieDto {
  date: string;

  message: string;
  user: User;
}
