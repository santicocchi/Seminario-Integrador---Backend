<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Entity("Localidad")
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 8 })
  cp: string;

    @ManyToOne(() => Provincia, provincia => provincia.localidades)
    @JoinColumn({ name: 'id_provincia' })
    provincia: Provincia;

    @OneToMany(() => Direccion, direccion => direccion.localidad)
    direcciones: Direccion[];
}
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Entity("Localidad")
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 8 })
  cp: string;

    @ManyToOne(() => Provincia, provincia => provincia.localidades)
    @JoinColumn({ name: 'id_provincia' })
    provincia: Provincia;

    @OneToMany(() => Direccion, direccion => direccion.localidad)
    direcciones: Direccion[];
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
