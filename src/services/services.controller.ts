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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { finaliseServiceDto } from './dto/finalise-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createServiceDto: CreateServiceDto,
    @GetUser() createur: User,
  ) {
    return this.servicesService.create(createServiceDto, createur);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  //route qui permet à un user d'afficher ses services
  @Get('/byUser')
  @UseGuards(AuthGuard())
  findAllbyUser(@GetUser() createur: User) {
    console.log('++++++++++++createur dans le controller', createur);
    return this.servicesService.findAllbyUser(createur);
  }

  //route qui permet à un client d'afficher ses services
  @Get('/byClient')
  @UseGuards(AuthGuard())
  findAllbyClient(@GetUser() client: User) {
    console.log('++++++++++++createur dans le controller', client);
    return this.servicesService.findAllbyClient(client);
  }

  //route qui affiche les détails d'un service dans "KnowMore"
  @Get('/detail/:id')
  @UseGuards(AuthGuard())
  findOneService(@Param('id') id: string) {
    return this.servicesService.findOneService(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.servicesService.findOne(id, user);
  }

  //route qui permet à un user de s'ajouter en tant que client
  @Patch('valid/:id')
  @UseGuards(AuthGuard())
  updateClient(@Param('id') id: string, @GetUser() client: User) {
    return this.servicesService.updateClient(id, client);
  }

  //route afin de finaliser un service
  @Patch('/finalise/:id')
  @UseGuards(AuthGuard())
  updateService(
    @Param('id') id: string,
    @Body() updateFinaliseDto: finaliseServiceDto,
  ) {
    return this.servicesService.updateService(id, updateFinaliseDto);
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
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
