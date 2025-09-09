import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Nivel } from './nivel.entity';
import { FormularioCv } from './formulario-cv.entity';

@Entity()
export class Idioma {
  @PrimaryGeneratedColumn()
  id_idioma: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Nivel, nivel => nivel.idiomas)
  @JoinColumn({ name: 'id_nivel' })
  nivel: Nivel;

  @ManyToOne(() => FormularioCv, cv => cv.idiomas)
  @JoinColumn({ name: 'id_formularioCV' })
  formularioCv: FormularioCv;
}
