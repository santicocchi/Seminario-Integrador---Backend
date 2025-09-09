import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Localidad } from './localidad.entity';
import { Empresa } from './empresa.entity';
import { Usuario } from './usuario.entity';

@Entity()
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
