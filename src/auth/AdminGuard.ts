import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

//Mise en place du rôle Admin
@Injectable()
//CanActivate détermine si une requête est valide ou non
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
    //Contexte d'éxecution de la requête http et renvoie un booléen, une promesse ou un observable [booléen asynchrone ou changement d'état]
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Extraction de la requête http
    const req = context.switchToHttp().getRequest();
    console.log('req -----------', req.user.role);
    //Vérification du rôle admin
    if (req.user.role.id === 2) {
      return true;
    } else {
      return false;
    }
  }
}
