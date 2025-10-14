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
    private authService: AuthService,
    private reflector: Reflector, // reflector permite leer metadatos de decoradores (como @Permissions)
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Obtenemos la solicitud HTTP
      const request: RequestWithUser = context.switchToHttp().getRequest();

      // Extraemos el token del header Authorization
      const authHeader = request.headers.authorization;
      if (!authHeader) throw new UnauthorizedException('No se proporcionó token');
      const token = authHeader.replace('Bearer ', '');

      // Decodificamos el token para obtener el payload
      const payload = this.jwtService.getPayload(token);

      // Buscamos la entidad correspondiente según el type
      let entity;
      if (payload.type === 'user') {
        entity = await this.authService['userRepo'].findOne({
          where: { email: payload.email },
          relations: ['role', 'role.permissions'],
        });
      } else if (payload.type === 'company') {
        entity = await this.authService['companyRepo'].findOne({
          where: { email: payload.email },
        });
      }

      if (!entity) throw new UnauthorizedException('Entidad no encontrada');

      // Guardamos la entidad en request.user para usarla en controladores
      request.user = {
        id: entity.id,
        email: entity.email,
        type: payload.type, // 'user' o 'company'
        name: payload.type === 'user' ? `${entity.nombre} ${entity.apellido}` : entity.nombre,
        role: entity.role?.name, 
        permissionCodes: entity.role?.permissions.map(p => p.code) ?? [],
        razonSocial : payload.type === 'company' ? entity.razonSocial : undefined,
        cuit : payload.type === 'company' ? entity.cuit : undefined,
      };

      // Obtenemos los permisos requeridos del decorador @Permissions
      const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

      // Si no hay permisos requeridos, permitimos el acceso
      if (!permissions || permissions.length === 0) return true;


      const userPermissions = request.user.permissionCodes ?? [];

      // Verificamos que la entidad tenga todos los permisos requeridos
      const hasPermission = permissions.every((perm) =>
        userPermissions.includes(perm),
      );

      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos suficientes');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message || 'No autorizado');
    }
  }
}
