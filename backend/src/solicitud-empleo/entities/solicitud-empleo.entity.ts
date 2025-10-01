import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OfertaEmpleo } from '../../oferta-empleo/entities/oferta-empleo.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Estado } from 'src/estado/entities/estado.entity';

@Entity("SolicitudEmpleo")
export class SolicitudEmpleo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

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
