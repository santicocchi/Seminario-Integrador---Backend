import { Module } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { LocalidadController } from './localidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localidad } from './entities/localidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Localidad])],
  controllers: [LocalidadController],
  providers: [LocalidadService],
})
export class LocalidadModule {}
