import { IsNotEmpty, Matches, IsInt, Min } from 'class-validator';

export class CreateOfertaEmpleoDto {
  @IsNotEmpty()
  empresaId?:number;

  @IsNotEmpty({ message: 'El título es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'El título solo puede contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  puesto: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'La descripción solo puede contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  descripcion: string;

  @IsNotEmpty({ message: 'La responsabilidad es obligatoria' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'La responsabilidad solo puede contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  responsabilidad: string;

  @IsNotEmpty({ message: 'La modalidad es obligatoria' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'La modalidad solo puede contener letras y espacios',
  })
  modalidad: string;

  @IsNotEmpty({ message: 'El horario es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'El horario solo puede contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  horario: string;

  @IsNotEmpty({ message: 'Los requisitos son obligatorios' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'Los requisitos solo pueden contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  requisitos: string;

  @IsNotEmpty({ message: 'Los beneficios son obligatorios' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-_]+$/, {
    message: 'Los beneficios solo pueden contener letras, números, espacios, comas, puntos, guiones y guiones bajos',
  })
  beneficios: string;



  @IsNotEmpty({ message: 'El ID de estado es obligatorio' })
  @IsInt({ message: 'El ID de estado debe ser un número entero' })
  @Min(1, { message: 'El ID de estado debe ser mayor a 0' })
  id_estado: number;
}
