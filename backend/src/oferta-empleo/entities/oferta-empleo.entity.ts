import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Estado } from 'src/estado/entities/estado.entity';

@Entity()
export class OfertaEmpleo {
  @PrimaryGeneratedColumn()
  id_ofertaEmpleo: number;

  @Column()
  puesto: string;

  @Column()
  descripcion: string;

  @Column()
  responsabilidad: string;

  @Column()
  modalidad: string;

  @Column()
  horario: string;

  @Column()
  requisitos: string;

  @Column()
  beneficios: string;

  @ManyToOne(() => Empresa, empresa => empresa.ofertas)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @ManyToOne(() => Estado, estado => estado.ofertas)
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;
}
