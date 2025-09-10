import { IsNotEmpty, Matches } from 'class-validator';

export class CreateProvinciaDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;
}
