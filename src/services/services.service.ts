import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceRepository.save(createServiceDto);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  async findOne(id: string): Promise<Service> {
    const foundService = await this.serviceRepository.findOneBy({ id: id });
    if (!foundService) {
      throw new NotFoundException(`Pas de service avec l'id: ${id}`);
    }
    return foundService;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const updateService = await this.findOne(id);
    if (updateService.titre !== undefined) {
      updateService.titre = updateServiceDto.titre;
    }
    if (updateService.localisation !== undefined) {
      updateService.localisation = updateServiceDto.localisation;
    }

    if (updateService.departement !== undefined) {
      updateService.departement = updateServiceDto.departement;
    }
    if (updateService.creation !== undefined) {
      updateService.creation = updateServiceDto.creation;
    }
    if (updateService.echeance !== undefined) {
      updateService.echeance = updateServiceDto.echeance;
    }
    if (updateService.note !== undefined) {
      updateService.note = updateServiceDto.note;
    }
    if (updateService.libelle !== undefined) {
      updateService.libelle = updateServiceDto.libelle;
    }
    return await this.serviceRepository.save(updateService);
  }

  async remove(id: string): Promise<string> {
    const result = await this.serviceRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de service avec l'id: ${id}`);
    }
    return `le service à l'id: ${id} a été supprimé!`;
  }
}
