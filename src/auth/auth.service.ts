import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/role/entities/role.entity';
import { UserLoginDto } from './dto/auth_login.dto';
import { UpdateServiceAdminDto } from './dto/update-service-admin.dto';
import { Service } from 'src/services/entities/service.entity';
import { UpdateUserAdminDto } from './dto/update-userAdmin.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async register(createAuthDto: CreateAuthDto): Promise<User> {
    const {
      nom,
      prenom,
      age,
      genre,
      adresse,
      ville,
      departement,
      mail,
      pseudo,
      mot_de_passe,
      compte_temps,
      // moyenne_notes,
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
      ville,
      departement,
      mail,
      mot_de_passe: hashedPassword,
      compte_temps,
      // moyenne_notes,
    });

    try {
      const roleUser = await this.roleRepository.findOneBy({ label: 'user' });
      // const roleUserString = roleUser.label;
      console.log('roleUser ', roleUser);
      //1 faire un get all users
      //2 récupérer tous les users.emaildans un tab
      //3 dans une boucle comparer => si result =
      user.role = roleUser;
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

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.userRepository.findOneBy({ mail: email });
  //   console.log('validate user');
  //   if (user && user.mot_de_passe === password) {
  //     const { mot_de_passe, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  async login(userLogin: UserLoginDto) {
    const userLogged = await this.userRepository.findOneBy({
      mail: userLogin.mail,
    });
    console.log('userLogged-----', userLogged);
    if (
      userLogged &&
      (await bcrypt.compare(userLogin.password, userLogged.mot_de_passe))
    ) {
      const payload = {
        userName: userLogin.mail,
        role: userLogged.role.label,
        id: userLogged.id,
      };
      console.log('payload: ', payload);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'le mail et/ou le password sont incorrects',
      );
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async updateService(
    id: string,
    updateServiceAdminDto: UpdateServiceAdminDto,
  ) {
    const foundService = await this.serviceRepository.findOneBy({ id: id });
    // const foundService = await this.serviceRepository.createQueryBuilder();
    // foundService.where({ id: id }).andWhere({ createur: createur });
    // const updateService = await foundService.();
    // const updateService = await this.serviceRepository.findOneBy({ id: id });
    // const foundService = await this.serviceRepository.findOne(id, createur);
    console.log('updateService---------', foundService);
    if (foundService.titre !== undefined) {
      foundService.titre = updateServiceAdminDto.titre;
    }
    if (foundService.localisation !== undefined) {
      foundService.localisation = updateServiceAdminDto.localisation;
    }

    if (foundService.departement !== undefined) {
      foundService.departement = updateServiceAdminDto.departement;
    }
    if (foundService.creation !== undefined) {
      foundService.creation = updateServiceAdminDto.creation;
    }
    if (foundService.echeance !== undefined) {
      foundService.echeance = updateServiceAdminDto.echeance;
    }
    if (foundService.note !== undefined) {
      foundService.note = updateServiceAdminDto.note;
    }
    if (foundService.libelle !== undefined) {
      foundService.libelle = updateServiceAdminDto.libelle;
    }
    if (foundService.categorie !== undefined) {
      foundService.categorie = updateServiceAdminDto.categorie;
    }
    return await this.serviceRepository.save(foundService);
  }

  async updateUser(
    id: string,
    updateUserAdminDto: UpdateUserAdminDto,
  ): Promise<User> {
    const userUpdate = await this.userRepository.findOneBy({ id: id });

    if (userUpdate.nom !== undefined) {
      userUpdate.nom = updateUserAdminDto.nom;
    }
    if (userUpdate.prenom !== undefined) {
      userUpdate.prenom = updateUserAdminDto.prenom;
    }
    if (userUpdate.pseudo !== undefined) {
      userUpdate.pseudo = updateUserAdminDto.pseudo;
    }
    if (userUpdate.age !== undefined) {
      userUpdate.age = updateUserAdminDto.age;
    }
    if (userUpdate.genre !== undefined) {
      userUpdate.genre = updateUserAdminDto.genre;
    }
    if (userUpdate.adresse !== undefined) {
      userUpdate.adresse = updateUserAdminDto.adresse;
    }
    if (userUpdate.ville !== undefined) {
      userUpdate.ville = updateUserAdminDto.ville;
    }
    if (userUpdate.departement !== undefined) {
      userUpdate.departement = updateUserAdminDto.departement;
    }
    if (userUpdate.mail !== undefined) {
      userUpdate.mail = updateUserAdminDto.mail;
    }
    if (userUpdate.mot_de_passe !== undefined) {
      userUpdate.mot_de_passe = updateUserAdminDto.mot_de_passe;
    }
    if (userUpdate.compte_temps !== undefined) {
      userUpdate.compte_temps = updateUserAdminDto.compte_temps;
    }
    if (userUpdate.moyenne_notes !== undefined) {
      userUpdate.moyenne_notes = updateUserAdminDto.moyenne_notes;
    }

    return await this.userRepository.save(userUpdate);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
