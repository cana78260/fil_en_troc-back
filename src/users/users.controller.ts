import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import jwt_decoded from 'jwt-decode';
import { AuthGuard } from '@nestjs/passport';
import { VerifUserDto } from './dto/verif-user.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export interface TokenDecoded {
  email: string;
  id: string;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //Admin
  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.usersService.findAll();
  }

  //User
  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  //User
  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('/reset/password')
  updateForgottedPassword(@Body() newPasswordDto: NewPasswordDto) {
    try {
      this.jwtService.verify(newPasswordDto.token);
      const tokenDecoded: TokenDecoded = jwt_decoded(newPasswordDto.token);
      console.log('le token décode', tokenDecoded.id);
      return this.usersService.updateForgottedPassword(
        newPasswordDto,
        tokenDecoded.id,
      );
    } catch (error) {
      console.log('erreur forgotted password', error);
      return error;
    }
  }

  @Post('/reset/password')
  findOneByEmail(@Body() verifUserDto: VerifUserDto) {
    if (verifUserDto.mail) {
      return this.usersService.findOneByEmail(verifUserDto.mail);
    }
  }

  //User
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
