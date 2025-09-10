import { IsNotEmpty, Matches, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateEstudioDto {
  @IsNotEmpty({ message: 'La institución es obligatoria' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-]+$/, {
    message: 'La institución solo puede contener letras, números, espacios, comas, puntos y guiones',
  })
  institucion: string;

  @IsNotEmpty({ message: 'El título es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-]+$/, {
    message: 'El título solo puede contener letras, números, espacios, comas, puntos y guiones',
  })
  titulo: string;

  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nivel solo puede contener letras y espacios',
  })
  nivel: string;

  @IsNotEmpty({ message: 'El año de inicio es obligatorio' })
  @IsInt({ message: 'El año de inicio debe ser un número entero' })
  @Min(1900, { message: 'El año de inicio no puede ser menor a 1900' })
  @Max(new Date().getFullYear(), { message: 'El año de inicio no puede ser mayor al año actual' })
  añoInicio: number;

  @IsOptional()
  @IsInt({ message: 'El año de fin debe ser un número entero' })
  @Min(1900, { message: 'El año de fin no puede ser menor a 1900' })
  @Max(new Date().getFullYear(), { message: 'El año de fin no puede ser mayor al año actual' })
  añoFin?: number;
}