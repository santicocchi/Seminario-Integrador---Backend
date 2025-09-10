import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { Usuario } from '../../../backend/src/usuario/entities/usuario.entity';
import { Empresa } from '../../../backend/src/empresa/entities/empresa.entity';

@Module({
  imports: [
    //importamos las entidades Usuario y Empresa para poder inyectarlas en el AuthService
    TypeOrmModule.forFeature([Usuario, Empresa]),
    //habilitamos Passport (maneja las estrategias de autenticación)
    PassportModule,
    //configuramos el módulo JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'miClaveSecreta123', // ⚠️ Usá variable de entorno
      signOptions: { expiresIn: '1h' } //el token expira en 1 hora
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService] //para poder inyectar el servicio en otros módulos
})
export class AuthModule {}
