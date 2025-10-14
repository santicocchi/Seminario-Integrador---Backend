import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { UserI } from 'src/interfaces/user.interface';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  permissionCodes: string[];
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column({ unique: true })
  cuil: string;

  @Column({nullable: true})
  telefono: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;
}
