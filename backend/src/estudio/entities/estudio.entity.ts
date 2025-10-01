import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FormularioCV } from 'src/formulario-cv/entities/formulario-cv.entity';

@Entity("Estudio")
export class Estudio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  institucion: string;

  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ type: 'varchar', length: 50 })
  nivel: string;

  @Column({ type: 'int' })
  añoInicio: number;

  @Column({ type: 'int', nullable: true })
  añoFin?: number;

  @ManyToOne(() => FormularioCV, cv => cv.estudios)
  @JoinColumn({ name: 'id_formularioCV' })
  formularioCv: FormularioCV;
}
