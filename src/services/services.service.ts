import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateClientDto } from './dto/update-ClientId.dto';
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
    console.log('.........createur', createur);
    const service = { ...createServiceDto, createur };

    console.log('*************service', service);
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
    console.log('///////////query', query);
    return query;
    //   query.where({ createur: user.id });
    //   console.log('ùùùùùùùùùùùquery', query);
    //   return query.getMany();
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
  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto,
    client: User,
  ): Promise<Service> {
    const patch = await this.findOneService(id);

    console.log('---------patch', patch);
    if (!patch) {
      throw new NotFoundException(`Pas de service avec l'id: ${id} `);
    }
    patch.client = client;

    return await this.serviceRepository.save(patch);
  }

  //finalisation et mise à jour des comptes-temps
  async updateService(
    id: string,
    data: any,
    // user: User,
  ) {
    const service = await this.serviceRepository.findOneBy({ id: id });

    const { createur, client } = service;
    createur.compte_temps += data.compte_temps;
    client.compte_temps -= data.compte_temps;
    await this.serviceRepository.save(service);
    await this.userRepository.save([createur, client]);

    // const service = await this.serviceRepository.findOneBy({ id });
    //const compteCreateur = service.createur.compte_temps;
    //const compteClient = service.client.compte_temps;

    return service;
  }

  //update un service
  async update(id: string, updateServiceDto: UpdateServiceDto, createur: User) {
    const updateService = await this.findOne(id, createur);
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
