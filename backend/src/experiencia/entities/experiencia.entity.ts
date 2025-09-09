import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FormularioCv } from 'src/formulario-cv/entities/formulario-cv.entity';

@Entity("Experiencia")
export class Experiencia {
  @PrimaryGeneratedColumn()
  id_experiencia: number;

  @Column()
  nombreEmpresa: string;

  @Column()
  puesto: string;

  @Column()
  añoInicio: number;

  @Column({ nullable: true })
  añoFin: number;

  @ManyToOne(() => FormularioCv, cv => cv.experiencias)
  @JoinColumn({ name: 'id_formularioCV' })
  formularioCv: FormularioCv;
}
