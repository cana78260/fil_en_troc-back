import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateClientDto } from './dto/update-ClientId.dto';
import { Service } from './entities/service.entity';

@Controller('services')
// @UseGuards(AuthGuard())
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createServiceDto: CreateServiceDto,
    @GetUser() createur: User,
  ) {
    console.log(
      '-------------createServiceDto dans le controller',
      createServiceDto,
      '++++++++++++createur dans le controller',
      createur,
    );
    return this.servicesService.create(createServiceDto, createur);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('/detail/:id')
  // @UseGuards(AuthGuard())
  findOneService(@Param('id') id: string) {
    return this.servicesService.findOneService(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.servicesService.findOne(id, user);
  }

  @Patch('valid/:id')
  @UseGuards(AuthGuard())
  updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @GetUser() client: User,
  ) {
    // if (
    //   updateClientDto.client.id === undefined ||
    //   updateClientDto.client.id === undefined
    // ) {
    //   throw new BadRequestException('veuillez remplir un champ .');
    // }
    return this.servicesService.updateClient(id, updateClientDto, client);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @GetUser() createur: User,
  ) {
    return this.servicesService.update(id, updateServiceDto, createur);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
