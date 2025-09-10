import { Injectable } from '@nestjs/common';
import { CreateOfertaEmpleoDto } from './dto/create-oferta-empleo.dto';
import { UpdateOfertaEmpleoDto } from './dto/update-oferta-empleo.dto';

@Injectable()
export class OfertaEmpleoService {
  create(createOfertaEmpleoDto: CreateOfertaEmpleoDto) {
    return 'This action adds a new ofertaEmpleo';
  }

  findAll() {
    return `This action returns all ofertaEmpleo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ofertaEmpleo`;
  }

  update(id: number, updateOfertaEmpleoDto: UpdateOfertaEmpleoDto) {
    return `This action updates a #${id} ofertaEmpleo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ofertaEmpleo`;
  }
}
