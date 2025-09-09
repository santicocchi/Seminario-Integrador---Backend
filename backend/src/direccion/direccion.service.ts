import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from '../entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
  ) {}

  async create(createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    const direccion = this.direccionRepository.create(createDireccionDto);
    return this.direccionRepository.save(direccion);
  }

  async findAll(): Promise<Direccion[]> {
    return this.direccionRepository.find();
  }

  async findOne(id: number): Promise<Direccion | null> {
    return this.direccionRepository.findOneBy({ id_direccion: id });
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto): Promise<Direccion | null> {
    await this.direccionRepository.update(id, updateDireccionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.direccionRepository.delete(id);
  }
}
