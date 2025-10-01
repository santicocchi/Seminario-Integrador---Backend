import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../../backend/src/usuario/entities/usuario.entity';
import { Empresa } from '../../../backend/src/empresa/entities/empresa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,
  ) {}

  //validar credenciales al hacer login
  async validateUsuario(email: string, password: string): Promise<Usuario> {
    const user = await this.usuarioRepo.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async validateEmpresa(email: string, password: string): Promise<Empresa> {
    const empresa = await this.empresaRepo.findOne({ where: { email } });
    if (empresa && (await bcrypt.compare(password, empresa.password))) {
      return empresa;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  //generar el jwt
  async loginUsuario(user: Usuario) {
    const payload = { sub: user.id_usuario, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),//el token lleva el id y el rol
    };
  }

  async loginEmpresa(empresa: Empresa) {
    const payload = { sub: empresa.id_empresa, role: empresa.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
