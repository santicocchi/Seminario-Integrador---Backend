
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { CompanyI } from 'src/interfaces/company.interface';


@Entity('companies')
export class CompanyEntity extends BaseEntity implements CompanyI{
  permissionCodes: string[];
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  cuit: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.companies, { eager: true })
  role: Role;
}
