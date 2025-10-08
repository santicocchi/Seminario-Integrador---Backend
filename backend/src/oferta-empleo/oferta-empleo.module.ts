import { Module } from '@nestjs/common';
import { OfertaEmpleoService } from './oferta-empleo.service';
import { OfertaEmpleoController } from './oferta-empleo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEmpleo } from './entities/oferta-empleo.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Estado } from 'src/estado/entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfertaEmpleo, Empresa, Estado])],
  controllers: [OfertaEmpleoController],
  providers: [OfertaEmpleoService],
})
export class OfertaEmpleoModule {}
