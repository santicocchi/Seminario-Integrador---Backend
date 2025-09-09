import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class EmpleoOfrecido {
  @PrimaryGeneratedColumn()
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
