import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudEmpleo } from '../entities/solicitud-empleo.entity';
import { CreateSolicitudEmpleoDto } from './dto/create-solicitud-empleo.dto';
import { UpdateSolicitudEmpleoDto } from './dto/update-solicitud-empleo.dto';

@Injectable()
export class SolicitudEmpleoService {
  constructor(
    @InjectRepository(SolicitudEmpleo)
    private readonly solicitudEmpleoRepository: Repository<SolicitudEmpleo>,
  ) {}

  async create(createSolicitudEmpleoDto: CreateSolicitudEmpleoDto): Promise< SolicitudEmpleo> {
    const solicitudEmpleo = this.solicitudEmpleoRepository.create(createSolicitudEmpleoDto as Partial<SolicitudEmpleo>);
    return this.solicitudEmpleoRepository.save(solicitudEmpleo);
  }

  async findAll(): Promise<SolicitudEmpleo[]> {
    return this.solicitudEmpleoRepository.find();
  }

  async findOne(id: number): Promise<SolicitudEmpleo | null> {
    return this.solicitudEmpleoRepository.findOneBy({ id_solicitudEmpleo: id });
  }

  async update(id: number, updateSolicitudEmpleoDto: UpdateSolicitudEmpleoDto): Promise<SolicitudEmpleo | null> {
    await this.solicitudEmpleoRepository.update(id, updateSolicitudEmpleoDto as Partial<SolicitudEmpleo>);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.solicitudEmpleoRepository.delete(id);
  }
}