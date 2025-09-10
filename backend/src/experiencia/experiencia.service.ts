import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experiencia } from './entities/experiencia.entity';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';

@Injectable()
export class ExperienciaService {
  constructor(
    @InjectRepository(Experiencia)
    private readonly experienciaRepository: Repository<Experiencia>,
  ) {}

  async create(createExperienciaDto: CreateExperienciaDto): Promise<Experiencia> {
    const experiencia = this.experienciaRepository.create(createExperienciaDto);
    return this.experienciaRepository.save(experiencia);
  }

  async findAll(): Promise<Experiencia[]> {
    return this.experienciaRepository.find();
  }

  async findOne(id: number): Promise<Experiencia | null> {
    return this.experienciaRepository.findOneBy({ id_experiencia: id });
  }

  async update(id: number, updateExperienciaDto: UpdateExperienciaDto): Promise<Experiencia | null> {
    await this.experienciaRepository.update(id, updateExperienciaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.experienciaRepository.delete(id);
  }
}