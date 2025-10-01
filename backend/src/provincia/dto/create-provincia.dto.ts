<<<<<<< HEAD
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateProvinciaDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;
}
=======
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateProvinciaDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
