import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { UserModule } from 'src/user/user.module';
import { CompanyModule } from 'src/company/company.module';
import { AppJwtModule } from 'src/jwt/app-jwt.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CompanyModule),
    AppJwtModule, 
    TypeOrmModule.forFeature([UserEntity, CompanyEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, AppJwtModule],
})
export class AuthModule {}

