import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { createTransport } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { NewPasswordDto } from './dto/new-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

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
    if (userUpdate.ville !== undefined) {
      userUpdate.ville = updateUserDto.ville;
    }
    if (userUpdate.departement !== undefined) {
      userUpdate.departement = updateUserDto.departement;
    }
    if (userUpdate.mail !== undefined) {
      userUpdate.mail = updateUserDto.mail;
    }
    if (updateUserDto.mot_de_passe !== undefined) {
      const saltOrRounds = 10;
      const password = updateUserDto.mot_de_passe;
      userUpdate.mot_de_passe = updateUserDto.mot_de_passe;
      const hash = await bcrypt.hash(password, saltOrRounds);
      userUpdate.mot_de_passe = hash;
    }

    return await this.userRepository.save(userUpdate);
  }

  async findOneByEmail(mail: string) {
    const mailFound = await this.userRepository.findOneBy({ mail: mail });
    let token;
    const transporter = createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    console.log(transporter, 'transporter');
    if (!mailFound) {
      throw new NotFoundException(`Pas d'utilisateurs cet email : ${mail}`);
    }
    try {
      token = this.jwtService.sign({
        email: mailFound.mail,
        id: mailFound.id,
      });
    } catch (error) {
      throw new Error('erreur lors de la generation du mail');
    }

    const urlLocal = `http://localhost:3000/resetpassword?token=${token}`;

    const message = {
      from: process.env.MAIL_USER,
      to: mailFound.mail,
      subject: 'Réinitialisation de votre mot de passe Fil en Troc',
      text: `Bonjour : ${mailFound.mail},
       cliquez sur ce lien pour réinitialiser votre mot de passe : ${urlLocal} ,`,
    };
    console.log(message, 'message');
    const mailSend = await transporter.sendMail(message);
    return { mailSend, token };
  }

  async updateForgottedPassword(newPasswordDto: NewPasswordDto, id: string) {
    const userUpdate = await this.findOne(id);
    console.log('utilisateur trouvé', userUpdate);
    if (newPasswordDto !== undefined) {
      const saltOrRounds = 10;
      const password = newPasswordDto.password;
      console.log('password: ', password);

      const hash = await bcrypt.hash(password, saltOrRounds);
      console.log('hash: ', hash);
      userUpdate.mot_de_passe = hash;
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
