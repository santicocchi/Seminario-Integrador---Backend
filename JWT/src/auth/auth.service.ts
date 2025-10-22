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

  
 async login(body: LoginDTO) {
  // Busco usuario
  let user: UserEntity | null = await this.userRepo.findOne({
    where: { email: body.email },
    relations: ['role', 'role.permissions']
  });

  // Declaro empresa (por si no encuentro usuario)
  let company: CompanyEntity | null = null;

  // Si no se encontró usuario, busco empresa
  if (!user) {
    company = await this.companyRepo.findOne({
      where: { email: body.email },
      relations: ['role', 'role.permissions']
    });
  }

  if (!user && !company)
    throw new UnauthorizedException('Email o contraseña incorrectos');

  // Determino el tipo y la entidad
  const type: 'user' | 'company' = user ? 'user' : 'company';
  const entity = user ?? company!; // elijo el que no sea null

  // Verifico la contraseña
  const valid = compareSync(body.password, entity.password);
  if (!valid)
    throw new UnauthorizedException('Email o contraseña incorrectos');

  // Armo el nombre según tipo
  const name =
    type === 'user'
      ? `${(entity as UserEntity).nombre} ${(entity as UserEntity).apellido}`
      : (entity as CompanyEntity).nombre;

  // Armo el payload
  const payload: Payload = {
    id: entity.id,
    name,
    email: entity.email,
    type,
    role: type === 'user' ? (entity as UserEntity).role?.name : undefined,
    permissionCodes: entity.role?.permissions.map(p => p.code) ?? [],
  };

  // Devuelvo los tokens
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
