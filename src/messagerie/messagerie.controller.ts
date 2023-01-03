import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagerieService } from './messagerie.service';
import { CreateMessagerieDto } from './dto/create-messagerie.dto';
import { UpdateMessagerieDto } from './dto/update-messagerie.dto';

@Controller('messagerie')
export class MessagerieController {
  constructor(private readonly messagerieService: MessagerieService) {}

  @Post()
  create(@Body() createMessagerieDto: CreateMessagerieDto) {
    return this.messagerieService.create(createMessagerieDto);
  }

  @Get()
  findAll() {
    return this.messagerieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagerieService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessagerieDto: UpdateMessagerieDto,
  ) {
    return this.messagerieService.update(+id, updateMessagerieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagerieService.remove(+id);
  }
}
