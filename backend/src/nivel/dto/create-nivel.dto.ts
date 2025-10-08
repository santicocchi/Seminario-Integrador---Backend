import { IsNotEmpty, Matches } from 'class-validator';

export class CreateNivelDto {
  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nivel solo puede contener letras y espacios',
  })
  nivel: string;
}