//las interfaces definen la estructura de los objetos en TypeScript
//en este caso, la interfaz CompanyI define la estructura de un objeto empresa
//incluye email, nombre, password y permissionCodes (codigos de permisos asignados a la empresa)
//la diferencia con el dto es que la interfaz no tiene validaciones ni reglas de negocio, solo define los tipos de datos
export interface CompanyI {
  email: string;
  nombre: string;
  password: string;
  permissionCodes: string[];
}
