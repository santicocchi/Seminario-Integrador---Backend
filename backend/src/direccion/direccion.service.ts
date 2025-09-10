import { HttpException, Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class DireccionService {
  constructor(
  @InjectRepository(Direccion)
  private direccionRepository: Repository<Direccion>,
  ) {}


  async create(createDireccionDto: CreateDireccionDto):Promise<Direccion> {
    const direccion = this.direccionRepository.create(createDireccionDto);
   try {
      return await this.direccionRepository.save(direccion);
    } catch (error) {
      throw new HttpException(error.message ?? 'Error al crear la ciudad', 500);
    }
  }

   async findAll(options: IPaginationOptions): Promise<Pagination<Direccion>> {
    return paginate<Direccion>(this.direccionRepository, options)
  }

  async findOne(id: number): Promise<Direccion | null> {
    return await this.direccionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto):Promise<Direccion | null> {
    await this.direccionRepository.update(id, updateDireccionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.direccionRepository.delete(id);
  }

  async updateFull(id:number,updateDireccionDto:CreateDireccionDto){
    await this.direccionRepository.update(id,updateDireccionDto);
    return this.direccionRepository.findOne({where:{id}});
  }
}
