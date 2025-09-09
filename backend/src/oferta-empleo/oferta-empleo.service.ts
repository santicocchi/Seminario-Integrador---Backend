import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfertaEmpleo } from '../entities/oferta-empleo.entity';
import { CreateOfertaEmpleoDto } from './dto/create-oferta-empleo.dto';
import { UpdateOfertaEmpleoDto } from './dto/update-oferta-empleo.dto';

@Injectable()
export class OfertaEmpleoService {
  constructor(
    @InjectRepository(OfertaEmpleo)
    private readonly ofertaEmpleoRepository: Repository<OfertaEmpleo>,
  ) {}

  async create(createOfertaEmpleoDto: CreateOfertaEmpleoDto): Promise<OfertaEmpleo> {
    const ofertaEmpleo = this.ofertaEmpleoRepository.create(createOfertaEmpleoDto);
    return this.ofertaEmpleoRepository.save(ofertaEmpleo);
  }

  async findAll(): Promise<OfertaEmpleo[]> {
    return this.ofertaEmpleoRepository.find();
  }

  async findOne(id: number): Promise<OfertaEmpleo | null> {
    return this.ofertaEmpleoRepository.findOneBy({ id_ofertaEmpleo: id });
  }

  async update(id: number, updateOfertaEmpleoDto: UpdateOfertaEmpleoDto): Promise<OfertaEmpleo | null> {
    await this.ofertaEmpleoRepository.update(id, updateOfertaEmpleoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ofertaEmpleoRepository.delete(id);
  }
}