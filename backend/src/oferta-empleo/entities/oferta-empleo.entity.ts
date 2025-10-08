import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Estado } from 'src/estado/entities/estado.entity';
import { SolicitudEmpleo } from 'src/solicitud-empleo/entities/solicitud-empleo.entity';

@Entity("OfertaEmpleo")
export class OfertaEmpleo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  puesto: string;

  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @Column({ type: 'varchar', length: 300 })
  responsabilidad: string;

  @Column({ type: 'varchar', length: 100 })
  modalidad: string;

  @Column({ type: 'varchar', length: 100 })
  horario: string;

  @Column({ type: 'varchar', length: 300 })
  requisitos: string;

  @Column({ type: 'varchar', length: 300 })
  beneficios: string;

  @ManyToOne(() => Empresa, empresa => empresa.ofertas)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @ManyToOne(() => Estado, estado => estado.ofertas)
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;

  
  // Relación: Una oferta puede tener muchas solicitudes
  @ManyToOne(() => SolicitudEmpleo, (solicitud) => solicitud.oferta, {
    cascade: true,           // permite que las solicitudes se creen/eliminen con la oferta
  })
  solicitudes: SolicitudEmpleo[];
}
