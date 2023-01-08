import { Module } from '@nestjs/common';
import { MessagerieService } from './messagerie.service';
import { MessagerieController } from './messagerie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messagerie } from './entities/messagerie.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messagerie])],
  controllers: [MessagerieController],
  providers: [MessagerieService],
})
export class MessagerieModule {}
