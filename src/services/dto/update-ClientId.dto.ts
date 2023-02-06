import { User } from 'src/users/entities/user.entity';

export class UpdateClientDto {
  client: User;
  createur: User;
}
