import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Direccion } from '../../direccion/entities/direccion.entity';
import { OfertaEmpleo } from '../../oferta-empleo/entities/oferta-empleo.entity';

@Entity("Empresa")
export class Empresa {
    @PrimaryGeneratedColumn()
    id_empresa: number;

    @Column()
    nombre: string;

    @Column()
    cuit: string;

    @Column()
    telefono: string;

    @Column()
    mail: string;

    @ManyToOne(() => Direccion, direccion => direccion.empresas)
    @JoinColumn({ name: 'id_direccion' })
    direccion: Direccion;

    @OneToMany(() => OfertaEmpleo, oferta => oferta.empresa)
    ofertas: OfertaEmpleo[];
}
