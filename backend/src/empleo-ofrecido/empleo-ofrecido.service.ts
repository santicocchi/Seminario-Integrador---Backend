import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpleoOfrecido } from './entities/empleo-ofrecido.entity';
import { CreateEmpleoOfrecidoDto } from './dto/create-empleo-ofrecido.dto';
import { UpdateEmpleoOfrecidoDto } from './dto/update-empleo-ofrecido.dto';

@Injectable()
export class EmpleoOfrecidoService {
  constructor(
    @InjectRepository(EmpleoOfrecido)
    private readonly empleoOfrecidoRepository: Repository<EmpleoOfrecido>,
  ) {}

  async create(createEmpleoOfrecidoDto: CreateEmpleoOfrecidoDto): Promise<EmpleoOfrecido> {
    const empleo = this.empleoOfrecidoRepository.create(createEmpleoOfrecidoDto);
    return this.empleoOfrecidoRepository.save(empleo);
  }

  async findAll(): Promise<EmpleoOfrecido[]> {
    return this.empleoOfrecidoRepository.find();
  }

  async findOne(id: number): Promise<EmpleoOfrecido | null> {
  return this.empleoOfrecidoRepository.findOneBy({ id_empleoOfrecido: id });  
}

  async update(id: number, updateEmpleoOfrecidoDto: UpdateEmpleoOfrecidoDto): Promise<EmpleoOfrecido | null> {
    await this.empleoOfrecidoRepository.update(id, updateEmpleoOfrecidoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.empleoOfrecidoRepository.delete(id);
  }
}
