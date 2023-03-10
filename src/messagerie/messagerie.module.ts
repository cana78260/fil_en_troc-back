import { Module } from '@nestjs/common';
import { MessagerieService } from './messagerie.service';
import { MessagerieController } from './messagerie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messagerie } from './entities/messagerie.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Messagerie]), AuthModule],
  controllers: [MessagerieController],
  providers: [MessagerieService],
})
export class MessagerieModule {}
