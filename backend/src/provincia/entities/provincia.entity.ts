<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Localidad } from 'src/localidad/entities/localidad.entity';

@Entity("Provincia")
export class Provincia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

    @OneToMany(() => Localidad, localidad => localidad.provincia)
    localidades: Localidad[];
}
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Localidad } from 'src/localidad/entities/localidad.entity';

@Entity("Provincia")
export class Provincia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

    @OneToMany(() => Localidad, localidad => localidad.provincia)
    localidades: Localidad[];
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
