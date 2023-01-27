import { PartialType } from '@nestjs/mapped-types';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto {
  intitule: string;
  image: string;
}
