import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Localidad } from '../../localidad/entities/localidad.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity("Direccion")
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:50})
  calle: string;

  @Column({type:'varchar', length:50})
  numero: string;

  @ManyToOne(() => Localidad, localidad => localidad.direcciones, { eager: true })
  @JoinColumn({ name: 'id_localidad' })
  localidad: Localidad;

  @OneToOne(() => Empresa, empresa => empresa.direccion)
  empresa: Empresa;

  @OneToOne(() => Usuario, usuario => usuario.direccion)
  usuarios: Usuario[];
}
