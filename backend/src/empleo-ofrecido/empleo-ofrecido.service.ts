import { Injectable } from '@nestjs/common';
import { CreateEmpleoOfrecidoDto } from './dto/create-empleo-ofrecido.dto';
import { UpdateEmpleoOfrecidoDto } from './dto/update-empleo-ofrecido.dto';

@Injectable()
export class EmpleoOfrecidoService {
  create(createEmpleoOfrecidoDto: CreateEmpleoOfrecidoDto) {
    return 'This action adds a new empleoOfrecido';
  }

  findAll() {
    return `This action returns all empleoOfrecido`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empleoOfrecido`;
  }

  update(id: number, updateEmpleoOfrecidoDto: UpdateEmpleoOfrecidoDto) {
    return `This action updates a #${id} empleoOfrecido`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleoOfrecido`;
  }
}
