import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Entity("Localidad")
export class Localidad {
    @PrimaryGeneratedColumn()
    id_localidad: number;

    @Column()
    nombre: string;

    @Column()
    cp: string;

    @ManyToOne(() => Provincia, provincia => provincia.localidades)
    @JoinColumn({ name: 'id_provincia' })
    provincia: Provincia;

    @OneToMany(() => Direccion, direccion => direccion.localidad)
    direcciones: Direccion[];
}
