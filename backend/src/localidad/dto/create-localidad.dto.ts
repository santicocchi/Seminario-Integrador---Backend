import { IsNotEmpty, Matches, IsInt, Min } from 'class-validator';

export class CreateLocalidadDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El código postal es obligatorio' })
  @Matches(/^[0-9]{4,8}$/, {
    message: 'El código postal solo puede contener entre 4 y 8 dígitos',
  })
  cp: string;

  @IsNotEmpty({ message: 'El ID de provincia es obligatorio' })
  @IsInt({ message: 'El ID de provincia debe ser un número entero' })
  @Min(1, { message: 'El ID de provincia debe ser mayor a 0' })
  id_provincia: number;
}