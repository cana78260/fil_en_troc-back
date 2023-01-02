import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { MessagerieModule } from './messagerie/messagerie.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [RoleModule, UsersModule, ServicesModule, MessagerieModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
