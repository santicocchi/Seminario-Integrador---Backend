import { Injectable } from '@nestjs/common';
import { CreateFormularioCvDto } from './dto/create-formulario-cv.dto';
import { UpdateFormularioCvDto } from './dto/update-formulario-cv.dto';

@Injectable()
export class FormularioCvService {
  create(createFormularioCvDto: CreateFormularioCvDto) {
    return 'This action adds a new formularioCv';
  }

  findAll() {
    return `This action returns all formularioCv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formularioCv`;
  }

  update(id: number, updateFormularioCvDto: UpdateFormularioCvDto) {
    return `This action updates a #${id} formularioCv`;
  }

  remove(id: number) {
    return `This action removes a #${id} formularioCv`;
  }
}
