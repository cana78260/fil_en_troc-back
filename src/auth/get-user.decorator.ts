import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

//Récupération d'un utilisateur via un décorateur custom
export const GetUser = createParamDecorator(
  //fonction de rappel en paramètre définie avec data et ctx[objet dont on utilise la méthode switch..pour extraire la requête]
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    //On accède à la propriété user de la requête
    return req.user;
  },
);
