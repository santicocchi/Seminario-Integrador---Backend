import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localidad } from '../entities/localidad.entity';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';

@Injectable()
export class LocalidadService {
  constructor(
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>,
  ) {}

  async create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
    const localidad = this.localidadRepository.create(createLocalidadDto);
    return this.localidadRepository.save(localidad);
  }

  async findAll(): Promise<Localidad[]> {
    return this.localidadRepository.find();
  }

  async findOne(id: number): Promise<Localidad | null> {
    return this.localidadRepository.findOneBy({ id_localidad: id });
  }

  async update(id: number, updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad | null> {
    await this.localidadRepository.update(id, updateLocalidadDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.localidadRepository.delete(id);
  }
}
