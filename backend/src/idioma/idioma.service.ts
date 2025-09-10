import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idioma } from './entities/idioma.entity';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';

@Injectable()
export class IdiomaService {
  constructor(
    @InjectRepository(Idioma)
    private readonly idiomaRepository: Repository<Idioma>,
  ) {}

  async create(createIdiomaDto: CreateIdiomaDto): Promise<Idioma> {
    // Map 'nivel' string to the expected object if necessary
    const { nivel, ...rest } = createIdiomaDto as any;
    const idiomaArr = this.idiomaRepository.create({
      ...rest,
      nivel: nivel ? { nombre: nivel } : undefined, // Adjust this mapping as per your Nivel entity
    });
    // Ensure idioma is a single object, not an array
    const idioma = Array.isArray(idiomaArr) ? idiomaArr[0] : idiomaArr;
    return await this.idiomaRepository.save(idioma);
  }

  async findAll(): Promise<Idioma[]> {
    return this.idiomaRepository.find();
  }

  async findOne(id: number): Promise<Idioma | null> {
    return this.idiomaRepository.findOneBy({ id_idioma: id });
  }

  async update(id: number, updateIdiomaDto: UpdateIdiomaDto): Promise<Idioma | null> {
    // Map 'nivel' string to the expected object if necessary
    const { nivel, ...rest } = updateIdiomaDto as any;
    const updateData = {
      ...rest,
      nivel: nivel ? { nombre: nivel } : undefined, // Adjust this mapping as per your Nivel entity
    };
    await this.idiomaRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.idiomaRepository.delete(id);
  }
}
