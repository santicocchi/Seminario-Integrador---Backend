import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, Role]),
  forwardRef(() => AuthModule),
 

],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
