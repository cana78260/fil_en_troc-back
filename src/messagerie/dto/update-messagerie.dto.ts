import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagerieDto } from './create-messagerie.dto';

export class UpdateMessagerieDto extends PartialType(CreateMessagerieDto) {}
