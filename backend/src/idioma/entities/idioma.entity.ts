import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Nivel } from 'src/nivel/entities/nivel.entity';
import { FormularioCV } from 'src/formulario-cv/entities/formulario-cv.entity';

@Entity("Idioma")
export class Idioma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  //@ManyToOne(() => Nivel, nivel => nivel.idiomas)
  //@JoinColumn({ name: 'id_nivel' })
  //nivel: Nivel;

  //@ManyToOne(() => FormularioCv, cv => cv.idiomas)
  //@JoinColumn({ name: 'id_formularioCV' })
  //formularioCv: FormularioCV;

  @OneToOne(() => Nivel, nivel => nivel.idioma)
  @JoinColumn() // el dueño de la relación
  nivel: Nivel;

}
