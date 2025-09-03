import { Injectable } from '@nestjs/common';
import { CreateSolicitudEmpleoDto } from './dto/create-solicitud-empleo.dto';
import { UpdateSolicitudEmpleoDto } from './dto/update-solicitud-empleo.dto';

@Injectable()
export class SolicitudEmpleoService {
  create(createSolicitudEmpleoDto: CreateSolicitudEmpleoDto) {
    return 'This action adds a new solicitudEmpleo';
  }

  findAll() {
    return `This action returns all solicitudEmpleo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitudEmpleo`;
  }

  update(id: number, updateSolicitudEmpleoDto: UpdateSolicitudEmpleoDto) {
    return `This action updates a #${id} solicitudEmpleo`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudEmpleo`;
  }
}
