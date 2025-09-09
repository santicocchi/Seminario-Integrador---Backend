import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provincia } from '../entities/provincia.entity';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  async create(createProvinciaDto: CreateProvinciaDto): Promise<Provincia> {
    const provincia = this.provinciaRepository.create(createProvinciaDto);
    return this.provinciaRepository.save(provincia);
  }

  async findAll(): Promise<Provincia[]> {
    return this.provinciaRepository.find();
  }

  async findOne(id: number): Promise<Provincia | null> {
    return this.provinciaRepository.findOneBy({  id_provincia: id });
  }

  async update(id: number, updateProvinciaDto: UpdateProvinciaDto): Promise<Provincia | null> {
    await this.provinciaRepository.update(id, updateProvinciaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.provinciaRepository.delete(id);
  }
}