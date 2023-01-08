import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreate = await this.userRepository.save(createUserDto);
    return await this.userRepository.save(userCreate);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ id: id });
    if (!userFound) {
      throw new NotFoundException(`Pas d'utilisateurs avec l'id : ${id}`);
    }
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userUpdate = await this.findOne(id);

    if (userUpdate.nom !== undefined) {
      userUpdate.nom = updateUserDto.nom;
    }
    if (userUpdate.prenom !== undefined) {
      userUpdate.prenom = updateUserDto.prenom;
    }
    if (userUpdate.pseudo !== undefined) {
      userUpdate.pseudo = updateUserDto.pseudo;
    }
    if (userUpdate.age !== undefined) {
      userUpdate.age = updateUserDto.age;
    }
    if (userUpdate.genre !== undefined) {
      userUpdate.genre = updateUserDto.genre;
    }
    if (userUpdate.adresse !== undefined) {
      userUpdate.adresse = updateUserDto.adresse;
    }
    if (userUpdate.cp_ville !== undefined) {
      userUpdate.cp_ville = updateUserDto.cp_ville;
    }
    if (userUpdate.mail !== undefined) {
      userUpdate.mail = updateUserDto.mail;
    }
    if (userUpdate.mot_de_passe !== undefined) {
      userUpdate.mot_de_passe = updateUserDto.mot_de_passe;
    }
    if (userUpdate.heures_offertes !== undefined) {
      userUpdate.heures_offertes = updateUserDto.heures_offertes;
    }
    if (userUpdate.heures_recues !== undefined) {
      userUpdate.heures_recues = updateUserDto.heures_recues;
    }
    if (userUpdate.moyenne_notes !== undefined) {
      userUpdate.moyenne_notes = updateUserDto.moyenne_notes;
    }

    return await this.userRepository.save(userUpdate);
  }

  async remove(id: string): Promise<string> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'utilisateur avec l'id : ${id}`);
    }
    return `Vous venez de supprimer l'utilisateur possédant l'id: ${id}`;
  }
}
