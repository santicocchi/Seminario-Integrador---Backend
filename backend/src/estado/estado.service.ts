import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from '../entities/estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) {}

  async create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    const estado = this.estadoRepository.create(createEstadoDto as Partial<Estado>);
    return this.estadoRepository.save(estado);
  }

  async findAll(): Promise<Estado[]> {
    return this.estadoRepository.find();
  }

  async findOne(id: number): Promise<Estado | null> {
    return this.estadoRepository.findOneBy({ id_estado: id });
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto): Promise<Estado | null> {
    await this.estadoRepository.update(id, updateEstadoDto as Partial<Estado>);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.estadoRepository.delete(id);
  }
}
