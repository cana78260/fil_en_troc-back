import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UsePipes(
    new ValidationPipe(<ValidationPipeOptions>{
      transform: true,
      disableErrorMessages: false,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(errors),
    }),
  )
  root(): string {
    return this.appService.root();
  }
}
