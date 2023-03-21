import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { finaliseServiceDto } from './dto/finalise-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // post un service
  async create(
    createServiceDto: CreateServiceDto,
    user: User,
  ): Promise<Service> {
    const createur = {
      id: user.id,
    };
    const service = { ...createServiceDto, createur };

    return await this.serviceRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  //get les services d'un user
  async findAllbyUser(user: User): Promise<Service[]> {
    const query = await this.serviceRepository.findBy({
      createur: {
        id: user.id,
      },
    });
    return query;
  }

  //get les services d'un client
  async findAllbyClient(user: User): Promise<Service[]> {
    const query = await this.serviceRepository.findBy({
      client: {
        id: user.id,
      },
    });

    return query;
  }

  async findOneService(id: string): Promise<Service> {
    const queryServ = await this.serviceRepository.findOneBy({ id: id });

    return queryServ;
  }

  async findOne(id: string, user: User): Promise<Service> {
    const queryServ = await this.serviceRepository.createQueryBuilder();
    queryServ.where({ id: id }).andWhere({ users: user });
    const foundService = await queryServ.getOne();
    if (!foundService) {
      throw new NotFoundException(`Pas de service avec l'id: ${id}`);
    }
    return foundService;
  }
  // ajout du client dans un service
  async updateClient(id: string, client: User): Promise<Service> {
    const patch = await this.findOneService(id);

    if (client.compte_temps <= 30) {
      throw new NotFoundException(
        'Désolé, il vous faut au minimum 30 minutes pour valider le service',
      );
    }
    if (!patch) {
      throw new NotFoundException(`Pas de service avec l'id: ${id} `);
    }
    patch.client = client;

    return await this.serviceRepository.save(patch);
  }

  //finalisation et mise à jour des comptes-temps
  async updateService(id: string, updateFinaliseDto: finaliseServiceDto) {
    const service = await this.serviceRepository.findOneBy({ id: id });

    const { createur, client } = service;
    createur.compte_temps += updateFinaliseDto.compte_temps;
    client.compte_temps -= updateFinaliseDto.compte_temps;
    if (updateFinaliseDto.compte_temps > client.compte_temps) {
      throw new NotFoundException(
        `le temps à créditer dépasse le total compte temps de votre homologue `,
      );
    } else {
      await this.serviceRepository.save(service);
      await this.userRepository.save([createur, client]);
    }

    return service;
  }

  //update un service
  async update(id: string, updateServiceDto: UpdateServiceDto, createur: User) {
    const foundService = await this.serviceRepository.findOne({
      where: {
        id: id,
        createur: createur,
      },
    });

    console.log('updateService---------', foundService);
    if (foundService.titre !== undefined) {
      foundService.titre = updateServiceDto.titre;
    }
    if (foundService.localisation !== undefined) {
      foundService.localisation = updateServiceDto.localisation;
    }

    if (foundService.departement !== undefined) {
      foundService.departement = updateServiceDto.departement;
    }
    if (foundService.creation !== undefined) {
      foundService.creation = updateServiceDto.creation;
    }
    if (foundService.echeance !== undefined) {
      foundService.echeance = updateServiceDto.echeance;
    }
    if (foundService.note !== undefined) {
      foundService.note = updateServiceDto.note;
    }
    if (foundService.libelle !== undefined) {
      foundService.libelle = updateServiceDto.libelle;
    }
    if (foundService.categorie !== undefined) {
      foundService.categorie = updateServiceDto.categorie;
    }
    return await this.serviceRepository.save(foundService);
  }

  async remove(id: string): Promise<string> {
    const result = await this.serviceRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de service avec l'id: ${id}`);
    }
    return `le service à l'id: ${id} a été supprimé!`;
  }
}
