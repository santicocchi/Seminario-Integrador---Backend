<<<<<<< HEAD
import { IsNotEmpty, Matches, IsInt, Min, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  apellido: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser un valor válido de tipo Date' })
  fechaNacimiento: Date;

  @IsNotEmpty({ message: 'El género es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El género solo puede contener letras y espacios',
  })
  genero: string;

  @IsNotEmpty({ message: 'El CUIL es obligatorio' })
  @Matches(/^[0-9]{2}-[0-9]{8}-[0-9]$/, {
    message: 'El CUIL debe tener el formato 00-00000000-0',
  })
  cuil: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Matches(/^[0-9\-]+$/, {
    message: 'El teléfono solo puede contener números y guiones',
  })
  telefono: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  mail: string;

  @IsNotEmpty({ message: 'El ID de dirección es obligatorio' })
  @IsInt({ message: 'El ID de dirección debe ser un número entero' })
  @Min(1, { message: 'El ID de dirección debe ser mayor a 0' })
  id_direccion: number;

  @IsNotEmpty({ message: 'El ID de formulario CV es obligatorio' })
  @IsInt({ message: 'El ID de formulario CV debe ser un número entero' })
  @Min(1, { message: 'El ID de formulario CV debe ser mayor a 0' })
  id_formularioCv: number;
}
=======
import { IsNotEmpty, Matches, IsInt, Min, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  apellido: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser un valor válido de tipo Date' })
  fechaNacimiento: Date;

  @IsNotEmpty({ message: 'El género es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El género solo puede contener letras y espacios',
  })
  genero: string;

  @IsNotEmpty({ message: 'El CUIL es obligatorio' })
  @Matches(/^[0-9]{2}-[0-9]{8}-[0-9]$/, {
    message: 'El CUIL debe tener el formato 00-00000000-0',
  })
  cuil: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Matches(/^[0-9\-]+$/, {
    message: 'El teléfono solo puede contener números y guiones',
  })
  telefono: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  mail: string;

  @IsNotEmpty({ message: 'El ID de dirección es obligatorio' })
  @IsInt({ message: 'El ID de dirección debe ser un número entero' })
  @Min(1, { message: 'El ID de dirección debe ser mayor a 0' })
  id_direccion: number;

  @IsNotEmpty({ message: 'El ID de formulario CV es obligatorio' })
  @IsInt({ message: 'El ID de formulario CV debe ser un número entero' })
  @Min(1, { message: 'El ID de formulario CV debe ser mayor a 0' })
  id_formularioCv: number;
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
