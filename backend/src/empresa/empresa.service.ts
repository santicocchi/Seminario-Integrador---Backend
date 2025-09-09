import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = this.empresaRepository.create(createEmpresaDto);
    return this.empresaRepository.save(empresa);
  }

  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find();
  }

  async findOne(id: number): Promise<Empresa | null> {
    return this.empresaRepository.findOneBy({ id_empresa: id });
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto): Promise<Empresa | null> {
    await this.empresaRepository.update(id, updateEmpresaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.empresaRepository.delete(id);
  }
}
