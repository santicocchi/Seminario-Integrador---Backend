import { Module } from '@nestjs/common';
import { OfertaEmpleoService } from './oferta-empleo.service';
import { OfertaEmpleoController } from './oferta-empleo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEmpleo } from './entities/oferta-empleo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfertaEmpleo])],
  controllers: [OfertaEmpleoController],
  providers: [OfertaEmpleoService],
})
export class OfertaEmpleoModule {}
