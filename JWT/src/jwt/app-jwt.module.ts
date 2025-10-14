// src/jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { AppJwtService } from './app-jwt.service';

@Module({
  providers: [AppJwtService],
  exports: [AppJwtService],
})
export class AppJwtModule {}
