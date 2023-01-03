import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto {
  titre: string;

  categories: string;
  users: User;
}
