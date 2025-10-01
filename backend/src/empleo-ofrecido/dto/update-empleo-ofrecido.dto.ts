import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleoOfrecidoDto } from './create-empleo-ofrecido.dto';

export class UpdateEmpleoOfrecidoDto extends PartialType(CreateEmpleoOfrecidoDto) {}
