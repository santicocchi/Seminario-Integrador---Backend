import { Module } from '@nestjs/common';
import { OfertaEmpleoService } from './oferta-empleo.service';
import { OfertaEmpleoController } from './oferta-empleo.controller';

@Module({
  controllers: [OfertaEmpleoController],
  providers: [OfertaEmpleoService],
})
export class OfertaEmpleoModule {}
