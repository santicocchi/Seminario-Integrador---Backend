import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ----- Registro -----
  @Post('register-usuario')
  registerUsuario(@Body() body: { email: string; password: string }) {
    return this.authService.registerUsuario(body.email, body.password);
  }

  @Post('register-empresa')
  registerEmpresa(@Body() body: { email: string; password: string }) {
    return this.authService.registerEmpresa(body.email, body.password);
  }

  // ----- Login -----
  @Post('login-usuario')
  async loginUsuario(@Body() body: { email: string; password: string }) {
    const usuario = await this.authService.validateUsuario(body.email, body.password);
    return this.authService.loginUsuario(usuario);
  }

  @Post('login-empresa')
  async loginEmpresa(@Body() body: { email: string; password: string }) {
    const empresa = await this.authService.validateEmpresa(body.email, body.password);
    return this.authService.loginEmpresa(empresa);
  }
}
