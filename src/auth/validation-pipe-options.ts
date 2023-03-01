import { ValidationError, ValidatorOptions } from 'class-validator';

//Mise en place des décorateurs de class-validator
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  //transform est une propriété qui renvoie un booléen qui valide ou non la transformation des données par le décorateur
  disableErrorMessages?: boolean;
  //Si true, la propriété désactive les messages d'erreurs détaillés en cas d'erreur lors de la validation
  exceptionFactory?: (errors: ValidationError[]) => any;
  //Fonction qui prend un tableau d'erreurs adaptées en paramètre afin de renvoyer des messages adaptés
}
