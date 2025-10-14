import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RolesController } from './role.controller';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]),
  forwardRef(() => AuthModule),
],
  controllers: [RolesController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
