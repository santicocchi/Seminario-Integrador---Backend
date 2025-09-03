import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Experiencia } from './experiencia.entity';
import { Estudio } from './estudio.entity';
import { Idioma } from './idioma.entity';

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
