import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OfertaEmpleo } from './oferta-empleo.entity';
import { SolicitudEmpleo } from './solicitud-empleo.entity';

@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column()
  valor: string;

  @OneToMany(() => OfertaEmpleo, oferta => oferta.estado)
  ofertas: OfertaEmpleo[];

  @OneToMany(() => SolicitudEmpleo, solicitud => solicitud.estado)
  solicitudes: SolicitudEmpleo[];
}
