import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { MessagerieModule } from './messagerie/messagerie.module';
import { CategoriesModule } from './categories/categories.module';
import { User } from './users/entities/user.entity';
import { Service } from './services/entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role/entities/role.entity';
import { Messagerie } from './messagerie/entities/messagerie.entity';
import { Category } from './categories/entities/category.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Service, Role, Messagerie, Category],
      synchronize: process.env.MODE === 'DEV' ? true : false,
      logging: false,
    }),
    RoleModule,
    UsersModule,
    ServicesModule,
    MessagerieModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
