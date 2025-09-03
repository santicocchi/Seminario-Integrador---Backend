import { PartialType } from '@nestjs/mapped-types';
import { CreateOfertaEmpleoDto } from './create-oferta-empleo.dto';

export class UpdateOfertaEmpleoDto extends PartialType(CreateOfertaEmpleoDto) {}
