import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity("EmpleoOfrecido")
export class EmpleoOfrecido {
  @PrimaryGeneratedColumn()
  id_empleoOfrecido: number;

  @Column()
  puesto: string;

  @Column('text')
  descripcion: string;

  @ManyToOne(() => Usuario, usuario => usuario.empleosOfrecidos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
