
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, BaseEntity } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => UserEntity, (u) => u.role)
  users: UserEntity[];

  @OneToMany(() => CompanyEntity, (c) => c.role)
  companies: CompanyEntity[];
}

