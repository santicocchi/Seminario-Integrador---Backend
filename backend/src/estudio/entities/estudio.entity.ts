import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FormularioCv } from 'src/formulario-cv/entities/formulario-cv.entity';

@Entity()
export class Estudio {
  @PrimaryGeneratedColumn()
  id_estudio: number;

  @Column()
  institucion: string;

  @Column()
  titulo: string;

  @Column()
  nivel: string;

  @Column()
  añoInicio: number;

  @Column({ nullable: true })
  añoFin: number;

  @ManyToOne(() => FormularioCv, cv => cv.estudios)
  @JoinColumn({ name: 'id_formularioCV' })
  formularioCv: FormularioCv;
}
