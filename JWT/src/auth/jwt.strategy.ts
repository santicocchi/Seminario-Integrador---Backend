import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //decirle donde buscar el token y la clave secreta (en header Authorization)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //rechaza tokens vencidos
      secretOrKey: process.env.JWT_SECRET || 'miClaveSecreta123',
    });
  }

  //lo que retorna este método se asigna a request.user
  async validate(payload: any) {
    return { userId: payload.sub, rol: payload.rol };
  }
}
