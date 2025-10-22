import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import dayjs from 'dayjs'; // importación correcta
import { Payload } from 'src/interfaces/payload.interface';

//contiene la logica para generar, refrescar y validar tokens JWT
//usa diferentes secretos y duraciones para access tokens y refresh tokens
//el payload de los tokens incluye email y type ('user' o 'company')
//usamos un service aparte para manejar todo lo relacionado con JWT, 
// su diferencia con AuthService es que este ultimo maneja la logica de autenticacion y autorizacion
//Auth service usa JwtService para generar y validar tokens

@Injectable()
export class AppJwtService {
  /** --------------------
   * CONFIGURACIÓN DE TOKENS
   * -------------------- */
  private config = {
    auth: {
      secret: 'authSecret',    // secreto para access token
      expiresIn: '15m',        // duración access token
    },
    refresh: {
      secret: 'refreshSecret', // secreto para refresh token
      expiresIn: '1d',         // duración refresh token
    },
  };

  /** --------------------
   * GENERAR TOKEN
   * --------------------
   * payload: debe incluir email y type ('user' o 'company')
   */
  generateToken(payload: Payload, type: 'refresh' | 'auth' = 'auth'): string {
    return sign(payload, this.config[type].secret, {
      expiresIn: this.config[type].expiresIn,
    });
  }

  /** --------------------
   * REFRESCAR TOKEN
   * --------------------
   * Si el refresh token está por expirar en menos de 20 minutos,
   * genera uno nuevo, sino devuelve el existente.
   */
  refreshToken(refreshToken: string): { accessToken: string; refreshToken: string } {
    try {
      const payload = this.getPayload(refreshToken, 'refresh');

      // Validamos que payload.exp exista
      if (!payload.exp) {
        throw new UnauthorizedException('Token sin expiración');
      }

      // Calcula los minutos que faltan hasta que expire
      const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');

      return {

        //generamos un nuevo access token siempre
        accessToken: this.generateToken(payload, 'auth'), 
        //si el refresh token expira en menos de 20 minutos, genero uno nuevo, sino devuelvo el mismo
        refreshToken:
        
          timeToExpire < 20
            ? this.generateToken(payload, 'refresh')
            : refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  /** --------------------
   * OBTENER PAYLOAD DE TOKEN
   * --------------------
   *Devuelve el payload decodificado si el token es válido, con todos los campos definidos en la interfaz Payload
   */

  
   //Payload es una interfaz que define la estructura del payload del token JWT, incluyendo email y type

  getPayload(token: string, type: 'refresh' | 'auth' = 'auth'): Payload {
    try {
      const payload = verify(token, this.config[type].secret) as Payload; 

      if (!payload.email || !payload.type) {
        throw new UnauthorizedException('Token inválido');
      }

      return payload; //retorna el payload decodificado, con todos los campos definidos en la interfaz Payload

    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}

