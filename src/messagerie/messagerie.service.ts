import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessagerieDto } from './dto/create-messagerie.dto';
import { UpdateMessagerieDto } from './dto/update-messagerie.dto';
import { Messagerie } from './entities/messagerie.entity';

@Injectable()
export class MessagerieService {
  constructor(
    @InjectRepository(Messagerie)
    private messagerieRepository: Repository<Messagerie>,
  ) {}
  async create(createMessagerieDto: CreateMessagerieDto): Promise<Messagerie> {
    return await this.messagerieRepository.save(createMessagerieDto);
  }

  async findAll(): Promise<Messagerie[]> {
    return await this.messagerieRepository.find();
  }

  async findOne(id: string): Promise<Messagerie> {
    const messageFound = await this.messagerieRepository.findOneBy({ id: id });
    if (!messageFound) {
      throw new NotFoundException(`Pas de message lié à l'id: ${id}`);
    }
    return messageFound;
  }

  async update(id: string, updateMessagerieDto: UpdateMessagerieDto) {
    const updateMessage = await this.findOne(id);

    if (updateMessage.date !== undefined) {
      updateMessage.date = updateMessagerieDto.date;
    }
    if (updateMessage.message !== undefined) {
      updateMessage.message = updateMessagerieDto.message;
    }
    return await this.messagerieRepository.save(updateMessage);
  }

  async remove(id: string) {
    const result = await this.messagerieRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de message lié à l'id: ${id}`);
    }
    return `le message lié à l'id: ${id} a été supprimé!`;
  }
}
