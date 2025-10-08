import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>, // ahora usamos un repositorio inyectable
  ) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  canDo(user: UserI, permission: string): boolean {
    console.log('Permisos del usuario:', user.permissionCodes);
    console.log('Permiso solicitado:', permission);

    const result = user.permissionCodes.includes(permission);
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async register(body: RegisterDTO) {
    try {
      // Descomentar si querés validar email duplicado
      //const existingUser = await this.repository.findOne({ where: { email: body.email } });
       //if (existingUser) {
        //throw new Error('Email is already in use');
       //}

      // Usamos el repositorio para crear la entidad
      const user = this.repository.create(body);

      // Hasheamos la contraseña
      user.password = hashSync(user.password, 10);

      // Guardamos el usuario
      await this.repository.save(user);

      return { status: 'created' };
    } catch (error) {
      if (error.message === 'Email is already in use') {
        throw error;
      }
      throw new HttpException('Error de creación', 500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { email },
      relations: ['role', 'role.permissions'],
    });
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.repository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }
    user.role = roleId as any;
    await this.repository.save(user);
    return { status: 'rol asignado' };
  }
}