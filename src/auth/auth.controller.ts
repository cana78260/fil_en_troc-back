import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/auth_login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

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
      // createAuthDto.moyenne_notes
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
