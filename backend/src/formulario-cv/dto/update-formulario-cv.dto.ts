import { PartialType } from '@nestjs/mapped-types';
import { CreateFormularioCvDto } from './create-formulario-cv.dto';

export class UpdateFormularioCvDto extends PartialType(CreateFormularioCvDto) {}
