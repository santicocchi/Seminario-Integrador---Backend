import { IsNotEmpty, IsInt, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSolicitudEmpleoDto {
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser un valor válido de tipo Date' })
  fecha: Date;

  @IsNotEmpty({ message: 'El ID de oferta de empleo es obligatorio' })
  @IsInt({ message: 'El ID de oferta de empleo debe ser un número entero' })
  @Min(1, { message: 'El ID de oferta de empleo debe ser mayor a 0' })
  id_ofertaEmpleo: number;

  @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
  @IsInt({ message: 'El ID de usuario debe ser un número entero' })
  @Min(1, { message: 'El ID de usuario debe ser mayor a 0' })
  id_usuario: number;

  @IsNotEmpty({ message: 'El ID de estado es obligatorio' })
  @IsInt({ message: 'El ID de estado debe ser un número entero' })
  @Min(1, { message: 'El ID de estado debe ser mayor a 0' })
  id_estado: number;
}
