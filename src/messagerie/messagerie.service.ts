import { Injectable } from '@nestjs/common';
import { CreateMessagerieDto } from './dto/create-messagerie.dto';
import { UpdateMessagerieDto } from './dto/update-messagerie.dto';

@Injectable()
export class MessagerieService {
  create(createMessagerieDto: CreateMessagerieDto) {
    return 'This action adds a new messagerie';
  }

  findAll() {
    return `This action returns all messagerie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messagerie`;
  }

  update(id: number, updateMessagerieDto: UpdateMessagerieDto) {
    return `This action updates a #${id} messagerie`;
  }

  remove(id: number) {
    return `This action removes a #${id} messagerie`;
  }
}
