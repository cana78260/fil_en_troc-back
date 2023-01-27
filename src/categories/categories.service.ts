import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categorieRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categorieRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categorieRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const categorieFound = await this.categorieRepository.findOneBy({ id: id });
    if (!categorieFound) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return categorieFound;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const updateCategorie = await this.findOne(id);
    if (updateCategorie.intitule !== undefined) {
      updateCategorie.intitule = updateCategoryDto.intitule;
    }
    if (updateCategorie.image !== undefined) {
      updateCategorie.image = updateCategoryDto.image;
    }

    return await this.categorieRepository.save(updateCategorie);
  }

  async remove(id: string): Promise<string> {
    const result = await this.categorieRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de catégorie à l'id: ${id}`);
    }
    return `La catégorie liée à l'id: ${id} a été supprimée!`;
  }
}
