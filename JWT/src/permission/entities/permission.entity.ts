// src/entities/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; 
  @Column({ nullable: true })
  description?: string;
}

