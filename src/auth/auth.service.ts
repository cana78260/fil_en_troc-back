import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const {
      nom,
      prenom,
      age,
      genre,
      adresse,
      cp_ville,
      mail,
      pseudo,
      mot_de_passe,
      heures_offertes,
      heures_recues,
      moyenne_notes,
    } = createAuthDto;

    const salt = await bcrypt.genSalt();
    console.log('salt------', salt);
    console.log('mdp------', mot_de_passe);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
    console.log('hash------', hashedPassword);

    const user = this.userRepository.create({
      nom,
      prenom,
      pseudo,
      age,
      genre,
      adresse,
      cp_ville,
      mail,
      mot_de_passe: hashedPassword,
      heures_offertes,
      heures_recues,
      moyenne_notes,
    });

    try {
      const createdUser = await this.userRepository.save(user);
      delete createdUser.mot_de_passe;
      return createdUser;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
