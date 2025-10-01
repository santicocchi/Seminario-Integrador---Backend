import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from './entities/nivel.entity';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class NivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async create(createNivelDto: CreateNivelDto): Promise<Nivel> {
    const nivel = this.nivelRepository.create(createNivelDto as Partial<Nivel>);
    return this.nivelRepository.save(nivel);
  }

  async findAll(): Promise<Nivel[]> {
    return this.nivelRepository.find();
  }

  async findOne(id: number): Promise<Nivel | null> {
    return this.nivelRepository.findOneBy({ id_nivel: id });
  }
  async update(id: number, updateNivelDto: UpdateNivelDto): Promise<Nivel | null> {
    await this.nivelRepository.update(id, updateNivelDto as QueryDeepPartialEntity<Nivel>);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.nivelRepository.delete(id);
  }
}
