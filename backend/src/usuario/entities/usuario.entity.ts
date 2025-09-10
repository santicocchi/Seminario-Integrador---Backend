import { PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne, Entity } from "typeorm";
import { Direccion } from "../../direccion/entities/direccion.entity";
import { FormularioCv } from "../../formulario-cv/entities/formulario-cv.entity";
import { SolicitudEmpleo } from "../../solicitud-empleo/entities/solicitud-empleo.entity";
import { EmpleoOfrecido } from "src/empleo-ofrecido/entities/empleo-ofrecido.entity";

@Entity("Usuario")
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  fecha_nacimiento: Date;

  @Column()
  cuil: string;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column()
  id_direccion: number;

  @Column()
  password: string;

  @Column({ default: 'usuario' }) //rol por defecto
  role: string;

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
