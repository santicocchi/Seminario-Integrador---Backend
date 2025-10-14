
import { JwtPayload } from 'jsonwebtoken';

export interface Payload extends JwtPayload {
  id: number; //id de usuario o empresa
  email: string; //email de usuario o empresa
  type: 'user' | 'company'; //diferenciamos si el token pertenece a usuario o empresa
  name?: string; //nombre de usuario o empresa
  apellido?: string; //opcional, solo para usuarios
  razonSocial?: string; //opcional, solo para empresas
  cuit?: string; //opcional, solo para empresas
  role?: string; //opcional, solo para usuarios
  permissionCodes?: string[]; //opcional, codigos de permisos del usuario o empresa
 
}
