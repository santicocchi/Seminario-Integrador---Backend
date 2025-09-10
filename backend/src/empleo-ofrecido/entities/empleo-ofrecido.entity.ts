import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity("EmpleoOfrecido")
export class EmpleoOfrecido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:100})
  puesto: string;

  @Column('text')
  descripcion: string;

  @ManyToOne(() => Usuario, usuario => usuario.empleosOfrecidos, {eager:true})
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
