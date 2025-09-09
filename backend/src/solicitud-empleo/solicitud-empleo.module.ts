import { Module } from '@nestjs/common';
import { SolicitudEmpleoService } from './solicitud-empleo.service';
import { SolicitudEmpleoController } from './solicitud-empleo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudEmpleo } from './entities/solicitud-empleo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudEmpleo])],
  controllers: [SolicitudEmpleoController],
  providers: [SolicitudEmpleoService],
})
export class SolicitudEmpleoModule {}
