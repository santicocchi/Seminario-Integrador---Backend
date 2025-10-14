
import { IsDate, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  @MinLength(3)
  nombre: string;
  @IsString()
  @MinLength(3)
  apellido: string;
  @IsDate()
  fechaNacimiento: Date;
  @IsString()
  cuil: string;
  @IsString()
  telefono: string;
}
