import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import type { RegisterCompanyDTO } from 'src/dto/register-company.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import type { RequestWithUser } from 'src/interfaces/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  //se utiliza el decorador @Req para acceder a la solicitud y obtener el usuario/empresa autenticado
  //endpoits para login, registro, verificacion de permisos, refresco de token y asignacion de roles a usuarios y empresas
  //usamos un auth aparte porque ahora no solo tenemos usuarios, sino tambien empresas que se autentican y autorizan, entonces 
  //separamos la logica de autenticacion y autorizacion en su propio modulo, esto nos permite manejar ambos tipos de entidades de manera mas clara y organizada
  //así no repetimos endpoits o métodos en controladores separados para usuarios y empresas
  

  /** --------------------
   * ME (obtener datos del usuario o empresa autenticada, sin acceder a la BD)
   * los datos vienen del token,
   * -------------------- */
  @UseGuards(AuthGuard)
@Get('me')
me(@Req() req: RequestWithUser) {
  if (req.user.type === 'user') {
    return {
      // user
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      lastName: req.user.lastName,
      role: req.user.role,
      permissionCodes: req.user.permissionCodes,
    };
  } else {
    // company
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      permissionCodes: req.user.permissionCodes,
      cuit: req.user.cuit,
      razonSocial: req.user.razonSocial,
    };
  }
}

@Post('login')
login(@Body() body: LoginDTO) {
  return this.service.login(body);
}


  /** --------------------
   * LOGIN USUARIO
   * -------------------- */
  //@Post('login/user')
  //loginUser(@Body() body: LoginDTO) {
    //return this.service.login(body, 'user');
  //}

  /** --------------------
   * LOGIN EMPRESA
   * -------------------- */
  //@Post('login/company')
  //loginCompany(@Body() body: LoginDTO) {
    //return this.service.login(body, 'company');
  //}

  //la diferencia entre los endpoits para registar usuario y empresa de este controlador, con 
  //los endpoits para crear usuario y empresa de los controladores user y company, es que estos ultimos son usados por admins para crear usuarios y empresas
  //mientras que los endpoits de registro de este controlador son usados por los propios usuarios y empresas para registrarse ellos mismos
  //ademas, los endpoits de registro no requieren autenticacion, mientras que los endpoits de creacion en user y company si la requieren (solo admins pueden crear usuarios y empresas)
  //no es necesario que se completen todos los campos de usuario o empresa en el registro, solo los necesarios para crear la cuenta (email, password, etc)
  //los demas campos pueden ser completados luego por el usuario o empresa en su perfil, o al solicitar empleo o publicar oferta
  /** --------------------
   * REGISTRO USUARIO
   * -------------------- */
  @Post('register/user')
  registerUser(@Body() body: RegisterUserDTO) {
    return this.service.registerUser(body);
  }

  /** --------------------
   * REGISTRO EMPRESA
   * -------------------- */
  @Post('register/company')
  registerCompany(@Body() body: RegisterCompanyDTO) {
    return this.service.registerCompany(body);
  }

  /** --------------------
   * VERIFICAR PERMISO
   * -------------------- */
  @UseGuards(AuthGuard)
  @Get('can-do/:permission')
  canDo(@Req() req: RequestWithUser, @Param('permission') permission: string) {
    const allowed = this.service.canDo(req.user, permission);
    return { allowed, permission, user: req.user };
  }

  /** --------------------
   * REFRESCAR TOKEN
   * -------------------- */
  @Get('refresh-token')
  refreshToken(@Req() req: RequestWithUser) {
    return this.service.refreshToken(req.headers['refresh-token'] as string);
  }

  /** --------------------
   * ASIGNAR ROL (solo usuarios)
   * -------------------- */
  @Patch('users/:id/role')
  assignRole(@Param('id') userId: number, @Body('roleId') roleId: number) {
    return this.service.assignRole(userId, roleId);
  }

  /** --------------------
   * /ASIGNAR ROL (empresa)
   * -------------------- */
  @Patch('companies/:id/role')
  assignCompanyRole(@Param('id') companyId: number, @Body('roleId') roleId: number) {
    return this.service.assignCompanyRole(companyId, roleId);
  }

  
}
