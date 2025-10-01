<<<<<<< HEAD
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateNivelDto {
  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nivel solo puede contener letras y espacios',
  })
  nivel: string;
=======
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateNivelDto {
  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nivel solo puede contener letras y espacios',
  })
  nivel: string;
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
}