import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne, Check } from 'typeorm';
import { Direccion } from '../../direccion/entities/direccion.entity';
import { OfertaEmpleo } from '../../oferta-empleo/entities/oferta-empleo.entity';

@Entity("Empresa")
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar',length:50, unique:true})
    nombre: string;

    @Column({type:'varchar',length:11, unique:true})
    cuit: string;

    @Column({type:'varchar',length:20, unique:true})
    telefono: string;

<<<<<<< HEAD
    @Column({type:'varchar',length:100,unique:true})
    mail: string;

=======
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'empresa' }) //rol por defecto
    role: string;

>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
    @OneToOne(() => Direccion, direccion => direccion.empresa)
    @JoinColumn({ name: 'id_direccion' })
    direccion: Direccion;

    @OneToMany(() => OfertaEmpleo, oferta => oferta.empresa)
    ofertas: OfertaEmpleo[];
}
