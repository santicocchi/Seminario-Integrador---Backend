<<<<<<< HEAD
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateIdiomaDto {
  @IsNotEmpty({ message: 'El idioma es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El idioma solo puede contener letras y espacios',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'El nivel solo puede contener letras y números',
  })
  nivel: string;
}
=======
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateIdiomaDto {
  @IsNotEmpty({ message: 'El idioma es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El idioma solo puede contener letras y espacios',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El nivel es obligatorio' })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'El nivel solo puede contener letras y números',
  })
  nivel: string;
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
