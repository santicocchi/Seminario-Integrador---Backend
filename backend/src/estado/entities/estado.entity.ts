<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OfertaEmpleo } from 'src/oferta-empleo/entities/oferta-empleo.entity';
import { SolicitudEmpleo } from 'src/solicitud-empleo/entities/solicitud-empleo.entity';

@Entity("Estado")
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 100})
  valor: string;

  @OneToMany(() => OfertaEmpleo, oferta => oferta.estado)
  ofertas: OfertaEmpleo[];

  @OneToMany(() => SolicitudEmpleo, solicitud => solicitud.estado)
  solicitudes: SolicitudEmpleo[];
}
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OfertaEmpleo } from 'src/oferta-empleo/entities/oferta-empleo.entity';
import { SolicitudEmpleo } from 'src/solicitud-empleo/entities/solicitud-empleo.entity';

@Entity("Estado")
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 100})
  valor: string;

  @OneToMany(() => OfertaEmpleo, oferta => oferta.estado)
  ofertas: OfertaEmpleo[];

  @OneToMany(() => SolicitudEmpleo, solicitud => solicitud.estado)
  solicitudes: SolicitudEmpleo[];
}
>>>>>>> 1be595ab1fa080a7ab3f02ef6e846badeb0d3dd2
