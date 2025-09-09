import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Localidad } from '../../localidad/entities/localidad.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity("Direccion")
export class Direccion {
  @PrimaryGeneratedColumn()
  id_direccion: number;

  @Column()
  calle: string;

  @Column()
  numero: string;

  @ManyToOne(() => Localidad, localidad => localidad.direcciones)
  @JoinColumn({ name: 'id_localidad' })
  localidad: Localidad;

  @OneToMany(() => Empresa, empresa => empresa.direccion)
  empresas: Empresa[];

  @OneToMany(() => Usuario, usuario => usuario.direccion)
  usuarios: Usuario[];
}
