import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Nivel } from 'src/nivel/entities/nivel.entity';
import { FormularioCv } from 'src/formulario-cv/entities/formulario-cv.entity';

@Entity("Idioma")
export class Idioma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  nivel: string;


  @ManyToOne(() => FormularioCv, cv => cv.idiomas)
  @JoinColumn({ name: 'id_formularioCV' })
  formularioCv: FormularioCv;
}
