import { IsNotEmpty, Matches, IsInt, Min } from 'class-validator';

export class CreateEmpleoOfrecidoDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-]+$/, {
    message: 'El título solo puede contener letras, números, espacios, comas, puntos y guiones',
  })
  puesto: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-]+$/, {
    message: 'La descripción solo puede contener letras, números, espacios, comas, puntos y guiones',
  })
  descripcion: string;

  @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
  @IsInt({ message: 'El ID de usuario debe ser un número entero' })
  @Min(1, { message: 'El ID de usuario debe ser mayor a 0' })
  id_usuario: number;
}