import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './permission.service';
import { PermissionsController } from './permission.controller';
import { Permission } from './entities/permission.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]),
  forwardRef(() => AuthModule)],

  controllers: [PermissionsController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
