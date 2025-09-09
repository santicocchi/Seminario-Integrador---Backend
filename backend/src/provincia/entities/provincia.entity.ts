import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Localidad } from 'src/localidad/entities/localidad.entity';

@Entity("Provincia")
export class Provincia {
    @PrimaryGeneratedColumn()
    id_provincia: number;

    @Column()
    nombre: string;

    @OneToMany(() => Localidad, localidad => localidad.provincia)
    localidades: Localidad[];
}
