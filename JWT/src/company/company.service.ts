import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  // Crear empresa
  async create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    await this.companyRepository.save(company);
    return company;
  }

  // Listar todas las empresas
  async findAll() {
    return this.companyRepository.find({
      relations: ['users', 'roles', 'permissions'], // si tu entidad Company tiene estas relaciones
    });
  }

  // Buscar una empresa por ID
  async findOne(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users', 'roles', 'permissions'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  // Actualizar empresa
  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users', 'roles', 'permissions'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    Object.assign(company, updateCompanyDto);
    await this.companyRepository.save(company);

    // Devuelvo la empresa actualizada con relaciones
    return this.companyRepository.findOne({
      where: { id },
      relations: ['users', 'roles', 'permissions'],
    });
  }

  // Eliminar empresa
  async remove(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    await this.companyRepository.delete(id);
    return { deleted: true };
  }
}
