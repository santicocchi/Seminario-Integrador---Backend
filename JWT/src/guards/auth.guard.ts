import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import e from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RequestWithUser } from 'src/interfaces/request-user.interface';
import { AppJwtService } from 'src/jwt/app-jwt.service';



//el guardia se encarga de proteger las rutas que requieren autenticacion y autorizacion
//verifica la validez del token JWT y los permisos del usuario/empresa para acceder a ciertos endpoints
//usa el payload del token para identificar al usuario/empresa y sus permisos
//el payload incluye el email y el type (user o company)
//para validar los permisos, el guardia lee los metadatos definidos por el decorador @Permissions en los controladores

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: AppJwtService,
    private authService: AuthService, //inyeccion del servicio de autenticacion para acceder a los repositorios de usuario y empresa
    private reflector: Reflector, // reflector permite leer metadatos de decoradores (como @Permissions)
  ) {}
  //canActivate se ejecuta en cada solicitud protegida por este guardia, lo que hace es verificar el token JWT y los permisos del usuario/empresa
  //el método canActivate se usa para determinar si se permite o no el acceso a la ruta solicitada, antes de llegar al controlador
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Obtenemos la solicitud HTTP, getRequest devuelve el objeto de solicitud HTTP (req) que contiene detalles sobre la solicitud entrante, como headers, body, params, user (si autenticado), etc.
      const request: RequestWithUser = context.switchToHttp().getRequest();

      // Extraemos el token del header Authorization
      const authHeader = request.headers.authorization; 
      if (!authHeader) throw new UnauthorizedException('No se proporcionó token');

      const token = authHeader.replace('Bearer ', '');

      //le pasamos el token limpio al servicio JWT para verificar su validez
      //el servico AppJwtService se encarga de verificar y decodificar el token JWT
      const payload = this.jwtService.getPayload(token);
      request.user = payload; //adjuntamos el payload decodificado a la solicitud para que esté disponible en los controladores

      // Obtenemos los permisos requeridos del decorador @Permissions, estos permisos se definen en los controladores
      //usamos reflector para leer los metadatos definidos por el decorador @Permissions en el controlador
      //el contexto (context) proporciona info sobre la solicitud actual, incluyendo el controlador y el método que la maneja
      //usamos context.getHandler() para obtener el método del controlador que manejará la solicitud actual
      //luego usamos reflector.get para leer los permisos definidos en ese método

      //en esta liena lo que hacemos es obtener los permisos requeridos para acceder al endpoint actual
      //es decir el decorador @Permissions que usamos en el controlador

      //reflector.get lee los metadatos definidos por el decorador @Permissionsn en el controlador, y depsues getHandler devuelve el método del controlador que manejará la solicitud actual
      const permissions = this.reflector.get<string[]>('permissions', context.getHandler()); 
      
      if (!permissions || permissions.length === 0) return true;

      const userPermissions = payload.permissionCodes ?? []; //permsisos del usuario/empresa desde el payload del token 

      // Verificamos que el usuario/empresa tenga todos los permisos requeridos
      //every verifica que todos los permisos requeridos del endpoint estén en los permisos del usuario/empresa
      const hasPermission = permissions.every((perm) => userPermissions.includes(perm));
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos suficientes');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message || 'No autorizado');
    }
  }
}
