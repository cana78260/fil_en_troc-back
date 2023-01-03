import { Service } from 'src/services/entities/service.entity';

export class CreateCategoryDto {
  titre: string;

  categories: string;
  services: Service;
}
