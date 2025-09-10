import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne, Check } from 'typeorm';
import { Direccion } from '../../direccion/entities/direccion.entity';
import { OfertaEmpleo } from '../../oferta-empleo/entities/oferta-empleo.entity';

@Entity("Empresa")
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    cuit: string;

    @Column({type:'varchar',length:20})
    telefono: string;

    @Column()
    mail: string;

    @OneToOne(() => Direccion, direccion => direccion.empresa)
    @JoinColumn({ name: 'id_direccion' })
    direccion: Direccion;

    @OneToMany(() => OfertaEmpleo, oferta => oferta.empresa)
    ofertas: OfertaEmpleo[];
}
