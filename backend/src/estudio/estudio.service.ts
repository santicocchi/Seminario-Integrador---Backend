import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudio } from '../entities/estudio.entity';
import { CreateEstudioDto } from './dto/create-estudio.dto';
import { UpdateEstudioDto } from './dto/update-estudio.dto';

@Injectable()
export class EstudioService {
  constructor(
    @InjectRepository(Estudio)
    private readonly estudioRepository: Repository<Estudio>,
  ) {}

  async create(createEstudioDto: CreateEstudioDto): Promise<Estudio> {
    const estudio = this.estudioRepository.create(createEstudioDto);
    return this.estudioRepository.save(estudio);
  }

  async findAll(): Promise<Estudio[]> {
    return this.estudioRepository.find();
  }

  async findOne(id: number): Promise<Estudio | null> {
    return this.estudioRepository.findOneBy({ id_estudio: id });
  }

  async update(id: number, updateEstudioDto: UpdateEstudioDto): Promise<Estudio | null> {
    await this.estudioRepository.update(id, updateEstudioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.estudioRepository.delete(id);
  }
}