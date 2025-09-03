export class CreateUsuarioDto {
    contrasena: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero: string;
    cuil: string;
    telefono: string;
    mail: string;
    id_direccion: number;
    id_formularioCv: number;
}
