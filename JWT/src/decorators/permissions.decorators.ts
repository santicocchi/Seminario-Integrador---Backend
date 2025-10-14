import { SetMetadata } from '@nestjs/common';

//el decorador @Permissions se usa para definir los permisos necesarios para acceder a ciertos endpoints en los controladores
//estos permisos son verificados por el AuthGuard para permitir o denegar el acceso

export const Permissions = (permissions: string[]) =>
  SetMetadata('permissions', permissions);
