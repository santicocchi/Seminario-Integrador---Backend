import { IsNotEmpty, Matches } from 'class-validator';

export class CreateDireccionDto {
  @IsNotEmpty({ message: 'La calle es obligatoria' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'La calle solo puede contener letras y espacios',
  })
  calle: string;

  @IsNotEmpty({ message: 'El número es obligatorio' })
  @Matches(/^[0-9]+$/, {
    message: 'El número solo puede contener dígitos del 0 al 9',
  })
  numero: string;

  @IsNotEmpty({ message: 'La localidad es obligatoria' })
  id_localidad: number;
}
