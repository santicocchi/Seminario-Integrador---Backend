<<<<<<< HEAD
import { IsNotEmpty, Matches, IsInt, Min, Validate, IsOptional } from 'class-validator';

// Validador personalizado para PDF
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isPDF', async: false })
class IsPDF implements ValidatorConstraintInterface {
  validate(file: Buffer, args: ValidationArguments) {
    if (!file || !(file instanceof Buffer)) return false;
    // Un PDF siempre comienza con los bytes "%PDF"
    const header = file.toString('utf8', 0, 4);
    return header === '%PDF';
  }

  defaultMessage(args: ValidationArguments) {
    return 'El archivo debe ser un PDF válido';
  }
}

export class CreateFormularioCVDto {
  @IsNotEmpty({ message: 'El CV es obligatorio' })
  @Validate(IsPDF)
  cv: Buffer; // Aquí almacenamos el archivo como bytea

  @IsNotEmpty({ message: 'Las aptitudes son obligatorias' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'Las aptitudes solo pueden contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  aptitudes: string;

  @IsNotEmpty({ message: 'El ID de experiencia es obligatorio' })
  @IsInt({ message: 'El ID de experiencia debe ser un número entero' })
  @Min(1, { message: 'El ID de experiencia debe ser mayor a 0' })
  id_experiencia: number;

  @IsNotEmpty({ message: 'El ID de estudio es obligatorio' })
  @IsInt({ message: 'El ID de estudio debe ser un número entero' })
  @Min(1, { message: 'El ID de estudio debe ser mayor a 0' })
  id_estudio: number;

  @IsNotEmpty({ message: 'El ID de idioma es obligatorio' })
  @IsInt({ message: 'El ID de idioma debe ser un número entero' })
  @Min(1, { message: 'El ID de idioma debe ser mayor a 0' })
  id_idioma: number;
}
=======
import { IsNotEmpty, Matches, IsInt, Min, Validate, IsOptional } from 'class-validator';

// Validador personalizado para PDF
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isPDF', async: false })
class IsPDF implements ValidatorConstraintInterface {
  validate(file: Buffer, args: ValidationArguments) {
    if (!file || !(file instanceof Buffer)) return false;
    // Un PDF siempre comienza con los bytes "%PDF"
    const header = file.toString('utf8', 0, 4);
    return header === '%PDF';
  }

  defaultMessage(args: ValidationArguments) {
    return 'El archivo debe ser un PDF válido';
  }
}

export class CreateFormularioCVDto {
  @IsNotEmpty({ message: 'El CV es obligatorio' })
  @Validate(IsPDF)
  cv: Buffer; // Aquí almacenamos el archivo como bytea

  @IsNotEmpty({ message: 'Las aptitudes son obligatorias' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'Las aptitudes solo pueden contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  aptitudes: string;

  @IsNotEmpty({ message: 'El ID de experiencia es obligatorio' })
  @IsInt({ message: 'El ID de experiencia debe ser un número entero' })
  @Min(1, { message: 'El ID de experiencia debe ser mayor a 0' })
  id_experiencia: number;

  @IsNotEmpty({ message: 'El ID de estudio es obligatorio' })
  @IsInt({ message: 'El ID de estudio debe ser un número entero' })
  @Min(1, { message: 'El ID de estudio debe ser mayor a 0' })
  id_estudio: number;

  @IsNotEmpty({ message: 'El ID de idioma es obligatorio' })
  @IsInt({ message: 'El ID de idioma debe ser un número entero' })
  @Min(1, { message: 'El ID de idioma debe ser mayor a 0' })
  id_idioma: number;
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
