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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
        // role: userLogged.role.label,
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

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
