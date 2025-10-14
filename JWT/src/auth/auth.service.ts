import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from 'bcrypt';
import { AppJwtService } from 'src/jwt/app-jwt.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { Payload } from 'src/interfaces/payload.interface';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { RegisterCompanyDTO } from 'src/dto/register-company.dto';

//maneja la logica de autenticacion y autorizacion
//incluye metodos para login, registro, verificacion de permisos, refresco de token y asignacion de roles a usuarios y empresas
//usa type para diferenciar entre usuarios y empresas

@Injectable()
export class AuthService {
  constructor(
    private jwtService: AppJwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepo: Repository<CompanyEntity>,
  ) {}

  /** --------------------
   * LOGIN (usuarios y empresas)
   * -------------------- */
  async login(body: LoginDTO, type: 'user' | 'company') {
    //busco la entidad (usuario o empresa) por email
    //este bloque lo que hace es buscar en la base de datos el usuario o empresa que intenta loguearse
    //para diferenciar entre ambos, uso el parametro 'type' que puede ser 'user' o 'company'
    
    //segun el tipo, uso el repositorio correspondiente (userRepo o companyRepo)
    const repo = type === 'user' ? this.userRepo : this.companyRepo;

    //buscamos la entidad 
    const entity = await repo.findOne({ 
      where: { email: body.email }, 
      relations: ['role', 'role.permissions'] //cargo el rol y permisos asociados a la entidad, puede ser usuario o empresa
    });
    if (!entity) throw new UnauthorizedException("Email o contraseña incorrectos");

    const valid = compareSync(body.password, entity.password);
    //si la contraseña no es valida, lanzo una excepcion de no autorizado
    if (!valid) throw new UnauthorizedException("Email o contraseña incorrectos");

    //si el login es exitoso, genero el payload del token
    //el payload incluye id, email, type (user o company), name y role (solo para usuarios)
    //esto nos permite tener toda la informacion necesaria en el token para identificar al usuario o empresa y sus permisos
    //luego genero y retorno los tokens de acceso y refresco usando el servicio jwtService
    //el token de acceso se usa para autenticar solicitudes a recursos protegidos, mientras que el token de refresco se usa para obtener nuevos tokens de acceso cuando estos expiran
    //ambos tokens incluyen el mismo payload, pero tienen diferentes tiempos de expiracion y usos

    //construyo el nombre segun si es usuario o empresa, si es usuario uso nombre y apellido, si es empresa uso solo nombre, despues 
    //lo agrego al payload como 'name'
    let name: string;
    if (type === 'user') {
    const user = entity as UserEntity;
    name = `${user.nombre} ${user.apellido}`;
    } else {
    const company = entity as CompanyEntity;
    name = company.nombre;
    }

    const payload: Payload = { 
      id: entity.id,
      name,
      email: entity.email,
      type,
      role: type === 'user' ? entity.role?.name : undefined,
      permissionCodes: entity.role?.permissions.map(p => p.code) ?? [],
    };

      //este return genera y devuelve los tokens de acceso y refresco
    return {
      accessToken: this.jwtService.generateToken(payload, 'auth'),
      refreshToken: this.jwtService.generateToken(payload, 'refresh'),
    };
  }

  /** --------------------
   * REGISTRO DE USUARIO
   * -------------------- */
  async registerUser(body: RegisterUserDTO) {
    // validar que el email no exista, si existe lanzo una excepcion
    const exists = await this.userRepo.findOneBy({ email: body.email });
    if (exists) throw new HttpException('Email ya registrado', 409);

    const user = this.userRepo.create(body);
    // usamos bcrypt para hashear la contraseña antes de guardarla
    user.password = hashSync(user.password, 10);
    await this.userRepo.save(user);
    return { status: 'usuario creado' };
  }

  /** --------------------
   * REGISTRO DE EMPRESA
   * -------------------- */
  async registerCompany(body: RegisterCompanyDTO) {
    // validar que el email no exista, si existe lanzo una excepcion de conflicto (409)
    const exists = await this.companyRepo.findOneBy({ email: body.email });
    if (exists) throw new HttpException('Email ya registrado', 409);

    const company = this.companyRepo.create(body);
    // usamos bcrypt para hashear la contraseña antes de guardarla
    company.password = hashSync(company.password, 10);
    await this.companyRepo.save(company);
    return { status: 'empresa creada' };
  }

  /** --------------------
   * VERIFICAR PERMISO DE USUARIO
   * -------------------- */
  canDo(user: any, permission: string) {
    if (!user.permissionCodes?.includes(permission)) {
      throw new UnauthorizedException();
    }
    return true;
  }

  /** --------------------
   * REFRESCAR TOKEN
   * -------------------- */
  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  /** --------------------
   * ASIGNAR ROL (solo usuarios)
   * -------------------- */
  async assignRole(userId: number, roleId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new HttpException('Usuario no encontrado', 404);
    user.role = roleId as any;
    await this.userRepo.save(user);
    return { status: 'rol asignado' };
  }

  /** --------------------
   * ASIGNAR ROL (empresa)
   * -------------------- */

   async assignCompanyRole(companyId: number, roleId: number) {
    const company = await this.companyRepo.findOneBy({ id: companyId });
    if (!company) throw new HttpException('Empresa no encontrada', 404);
    company.role = roleId as any;
    await this.companyRepo.save(company);
    return { status: 'rol asignado' };
  }
}
