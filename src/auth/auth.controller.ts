import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { AdminGuard } from './AdminGuard';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/auth_login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateServiceAdminDto } from './dto/update-service-admin.dto';
import { UpdateUserAdminDto } from './dto/update-userAdmin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    if (
      createAuthDto.nom &&
      createAuthDto.prenom &&
      createAuthDto.pseudo &&
      createAuthDto.age &&
      createAuthDto.genre &&
      createAuthDto.adresse &&
      createAuthDto.ville &&
      createAuthDto.departement &&
      createAuthDto.mail &&
      createAuthDto.mot_de_passe &&
      createAuthDto.compte_temps
    ) {
      return this.authService.register(createAuthDto);
    } else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Post('login')
  async login(@Body() user: UserLoginDto) {
    if (user.mail && user.password) {
      return this.authService.login(user);
    } else {
      throw new BadRequestException(
        'Les champs mail et/ou password ne sont pas renseignés correctement',
      );
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
  //Route Admin pour modifier un service
  @Patch('/service/:id')
  @UseGuards(AuthGuard(), AdminGuard)
  updateService(
    @Param('id') id: string,
    @Body() updateServiceAdminDto: UpdateServiceAdminDto,
  ) {
    return this.authService.updateService(id, updateServiceAdminDto);
  }

  //Route Admin pour modifier un user
  @Patch('/user/:id')
  @UseGuards(AuthGuard(), AdminGuard)
  updateUser(
    @Param('id') id: string,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ) {
    return this.authService.updateUser(id, updateUserAdminDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
