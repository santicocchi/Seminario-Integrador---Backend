import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormularioCv } from '../entities/formulario-cv.entity';
import { CreateFormularioCvDto } from './dto/create-formulario-cv.dto';
import { UpdateFormularioCvDto } from './dto/update-formulario-cv.dto';

@Injectable()
export class FormularioCvService {
  constructor(
    @InjectRepository(FormularioCv)
    private readonly formularioCvRepository: Repository<FormularioCv>,
  ) {}

  async create(createFormularioCvDto: CreateFormularioCvDto): Promise<FormularioCv> {
    const formularioCv = this.formularioCvRepository.create(createFormularioCvDto);
    return this.formularioCvRepository.save(formularioCv);
  }

  async findAll(): Promise<FormularioCv[]> {
    return this.formularioCvRepository.find();
  }

  async findOne(id: number): Promise<FormularioCv | null> {
    return this.formularioCvRepository.findOneBy({ id_formularioCv: id });
  }

  async update(id: number, updateFormularioCvDto: UpdateFormularioCvDto): Promise<FormularioCv | null> {
    await this.formularioCvRepository.update(id, updateFormularioCvDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.formularioCvRepository.delete(id);
  }
}