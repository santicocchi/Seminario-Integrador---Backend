<<<<<<< HEAD
import { IsNotEmpty, Matches, IsEmail, IsNumber } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El CUIT es obligatorio' })
  @Matches(/^(\d{11}|\d{2}-\d{8}-\d{1})$/, {
    message: 'El CUIT debe ser 11 dígitos o con formato 00-00000000-0',
  })
  cuit: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo puede contener números',
  })
  telefono: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'Debe ingresar un correo electrónico válido' })
  mail: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsNumber({}, { message: 'La dirección debe ser un número válido (ID)' })
  id_direccion: number;
}
=======
import { IsNotEmpty, Matches, IsEmail, IsNumber } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El CUIT es obligatorio' })
  @Matches(/^(\d{11}|\d{2}-\d{8}-\d{1})$/, {
    message: 'El CUIT debe ser 11 dígitos o con formato 00-00000000-0',
  })
  cuit: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Matches(/^[0-9]+$/, {
    message: 'El teléfono solo puede contener números',
  })
  telefono: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'Debe ingresar un correo electrónico válido' })
  mail: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsNumber({}, { message: 'La dirección debe ser un número válido (ID)' })
  id_direccion: number;
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
