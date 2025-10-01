import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FormularioCV } from 'src/formulario-cv/entities/formulario-cv.entity';

@Entity("Experiencia")
export class Experiencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  empresa: string;

  @Column({ type: 'varchar', length: 150 })
  puesto: string;

  @Column({ type: 'int' })
  añoInicio: number;

  @Column({ type: 'int', nullable: true })
  añoFin?: number;

  @ManyToOne(() => FormularioCV, cv => cv.experiencias)
  @JoinColumn({ name: 'id_formularioCV' })
  formularioCv: FormularioCV;
}