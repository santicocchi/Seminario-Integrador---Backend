import { PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Direccion } from "./direccion.entity";
import { FormularioCv } from "./formulario-cv.entity";
import { SolicitudEmpleo } from "./solicitud-empleo.entity";
import { EmpleoOfrecido } from "./empleo-ofrecido.entity";

export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  cuil: string;

  @Column()
  telefono: string;

  @Column()
  mail: string;

  @ManyToOne(() => Direccion, direccion => direccion.usuarios)
  @JoinColumn({ name: 'id_direccion' })
  direccion: Direccion;

  @OneToOne(() => FormularioCv, { cascade: true })
  @JoinColumn({ name: 'id_formularioCv' })
  formularioCV: FormularioCv;

  @OneToMany(() => SolicitudEmpleo, solicitud => solicitud.usuario)
  solicitudes: SolicitudEmpleo[];

  @OneToMany(() => EmpleoOfrecido, empleo => empleo.usuario)
  empleosOfrecidos: EmpleoOfrecido[];
}
