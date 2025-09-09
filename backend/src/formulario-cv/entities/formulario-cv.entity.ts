import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Experiencia } from 'src/experiencia/entities/experiencia.entity';
import { Estudio } from 'src/estudio/entities/estudio.entity';
import { Idioma } from 'src/idioma/entities/idioma.entity';

@Entity("FormularioCv")
export class FormularioCv {
  @PrimaryGeneratedColumn()
  id_formularioCv: number;

  @Column('text')
  cv: string;

  @Column('text')
  aptitudes: string;

  @OneToMany(() => Experiencia, exp => exp.formularioCv, { cascade: true })
  experiencias: Experiencia[];

  @OneToMany(() => Estudio, est => est.formularioCv, { cascade: true })
  estudios: Estudio[];

  @OneToMany(() => Idioma, idioma => idioma.formularioCv, { cascade: true })
  idiomas: Idioma[];
}
