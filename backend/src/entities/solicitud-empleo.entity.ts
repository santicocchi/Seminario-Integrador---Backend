import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OfertaEmpleo } from './oferta-empleo.entity';
import { Usuario } from './usuario.entity';
import { Estado } from './estado.entity';

export class SolicitudEmpleo {
    @PrimaryGeneratedColumn()
  id_solicitudEmpleo: number;

  @Column({ type: 'date' })
  fechaSolicitud: Date;

  @ManyToOne(() => OfertaEmpleo)
  @JoinColumn({ name: 'id_ofertaEmpleo' })
  ofertaEmpleo: OfertaEmpleo;

  @ManyToOne(() => Usuario, usuario => usuario.solicitudes)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Estado, estado => estado.solicitudes)
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;
}
