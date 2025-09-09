import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Idioma } from './idioma.entity';

@Entity()
export class Nivel {
  @PrimaryGeneratedColumn()
  id_nivel: number;

  @Column()
  nombre: string;

  @OneToMany(() => Idioma, idioma => idioma.nivel)
  idiomas: Idioma[];
}
