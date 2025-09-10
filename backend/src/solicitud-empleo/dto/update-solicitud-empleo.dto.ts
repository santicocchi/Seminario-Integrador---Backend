import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudEmpleoDto } from './create-solicitud-empleo.dto';

export class UpdateSolicitudEmpleoDto extends PartialType(CreateSolicitudEmpleoDto) {}
