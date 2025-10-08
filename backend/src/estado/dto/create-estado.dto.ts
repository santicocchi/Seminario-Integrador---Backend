import { IsNotEmpty, Matches, IsInt, Min } from 'class-validator';

export class CreateEstadoDto {
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  @IsInt({ message: 'El ID debe ser un número entero' })
  @Min(1, { message: 'El ID debe ser mayor a 0' })
  id: number;

  @IsNotEmpty({ message: 'El valor es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-]+$/, {
    message: 'El valor solo puede contener letras, números, espacios, comas, puntos y guiones',
  })
    valor: string;
}