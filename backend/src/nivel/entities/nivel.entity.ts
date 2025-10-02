import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Idioma } from 'src/idioma/entities/idioma.entity';

@Entity("Nivel")
export class Nivel {
  @PrimaryGeneratedColumn()
  id_nivel: number;

  @Column()
  nombre: string;


  @OneToMany(() => Idioma, idioma => idioma.nivel)
  idiomas: Idioma[]
}
