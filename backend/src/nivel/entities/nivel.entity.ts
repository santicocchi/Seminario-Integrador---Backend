import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Idioma } from 'src/idioma/entities/idioma.entity';

@Entity("Nivel")
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nivel: string;

  @OneToOne(() => Idioma, idioma => idioma.nivel)
  idioma: Idioma;

}
