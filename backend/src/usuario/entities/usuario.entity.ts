import { PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne, Entity } from "typeorm";
import { Direccion } from "../../direccion/entities/direccion.entity";
import { FormularioCv } from "../../formulario-cv/entities/formulario-cv.entity";
import { SolicitudEmpleo } from "../../solicitud-empleo/entities/solicitud-empleo.entity";
import { EmpleoOfrecido } from "src/empleo-ofrecido/entities/empleo-ofrecido.entity";

@Entity("Usuario")
 export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'varchar', length: 20 })
  genero: string;

  @Column({ type: 'varchar', length: 13, unique: true })
  cuil: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 100, unique: true })
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
