import { Module } from '@nestjs/common';
import { SolicitudEmpleoService } from './solicitud-empleo.service';
import { SolicitudEmpleoController } from './solicitud-empleo.controller';

@Module({
  controllers: [SolicitudEmpleoController],
  providers: [SolicitudEmpleoService],
})
export class SolicitudEmpleoModule {}
