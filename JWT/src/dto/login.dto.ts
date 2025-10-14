
import { IsEmail, IsString, MinLength } from 'class-validator';

//los dtos (data transfer objects) se usan para definir la estructura de los datos que se envian y reciben en las solicitudes HTTP
//en este caso, el dto LoginDTO define los datos necesarios para que un usuario o empresa inicie sesion
//incluye validaciones para asegurar que el email tenga formato correcto y que la password tenga una longitud minima

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
