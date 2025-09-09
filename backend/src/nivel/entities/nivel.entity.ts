import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Idioma } from 'src/idioma/entities/idioma.entity';

@Entity()
export class Nivel {
  @PrimaryGeneratedColumn()
  id_nivel: number;

  @Column()
  nombre: string;

  @OneToMany(() => Idioma, idioma => idioma.nivel)
  idiomas: Idioma[];
}
