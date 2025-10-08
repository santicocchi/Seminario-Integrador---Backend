import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfertaEmpleo } from './entities/oferta-empleo.entity';
import { CreateOfertaEmpleoDto } from './dto/create-oferta-empleo.dto';
import { UpdateOfertaEmpleoDto } from './dto/update-oferta-empleo.dto';
import { Estado } from '../estado/entities/estado.entity';
import { EstadoSolicitud } from 'src/enums/estado-oferta.enum';
import { EstadoOferta } from 'src/enums/estado-solicitud.enum';


@Injectable()
export class OfertaEmpleoService {
  solicitudEmpleoRepository: any;
  constructor(
    @InjectRepository(OfertaEmpleo)
    private readonly ofertaEmpleoRepository: Repository<OfertaEmpleo>,
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) {}

  async create(createOfertaEmpleoDto: CreateOfertaEmpleoDto): Promise<OfertaEmpleo> {
    // Al crear, la oferta debe quedar en estado DISPONIBLE
    const estadoDisponible = await this.estadoRepository.findOne({ where: { valor: EstadoOferta.DISPONIBLE } });
    if (!estadoDisponible) throw new NotFoundException('Estado DISPONIBLE no encontrado');
    const ofertaEmpleo = this.ofertaEmpleoRepository.create({
      ...createOfertaEmpleoDto,
      estado: estadoDisponible,
      empresa: createOfertaEmpleoDto.empresaId,
    });
    return this.ofertaEmpleoRepository.save(ofertaEmpleo);
  }
  async pausarOfertaEmpleo(id: number): Promise<OfertaEmpleo> {
    const oferta = await this.findOne(id);
    if (!oferta) throw new NotFoundException('Oferta no encontrada');
    if (oferta.estado?.valor !== EstadoOferta.DISPONIBLE) {
      throw new BadRequestException('Solo se puede pausar una oferta en estado DISPONIBLE');
    }
    const estadoPausada = await this.estadoRepository.findOne({ where: { valor: EstadoOferta.PAUSADA } });
    if (!estadoPausada) throw new NotFoundException('Estado PAUSADA no encontrado');
    oferta.estado = estadoPausada;
    return this.ofertaEmpleoRepository.save(oferta);
  }

  async ponerDisponibleOfertaEmpleo(id: number): Promise<OfertaEmpleo> {
    const oferta = await this.findOne(id);
    if (!oferta) throw new NotFoundException('Oferta no encontrada');
    if (oferta.estado?.valor !== EstadoOferta.PAUSADA) {
      throw new BadRequestException('Solo se puede poner disponible una oferta en estado PAUSADA');
    }
    const estadoDisponible = await this.estadoRepository.findOne({ where: { valor: EstadoOferta.DISPONIBLE } });
    if (!estadoDisponible) throw new NotFoundException('Estado DISPONIBLE no encontrado');
    oferta.estado = estadoDisponible;
    return this.ofertaEmpleoRepository.save(oferta);
  }

  async eliminarOfertaEmpleo(id: number): Promise<OfertaEmpleo> {
    const oferta = await this.findOne(id, { relations: ['solicitudes', 'estado'] });

    if (!oferta) throw new NotFoundException('Oferta no encontrada');
    if (
      oferta.estado?.valor !== EstadoOferta.DISPONIBLE &&
      oferta.estado?.valor !== EstadoOferta.PAUSADA
    ) {
      throw new BadRequestException('Solo se puede eliminar una oferta DISPONIBLE o PAUSADA');
    }
    const estadoEliminada = await this.estadoRepository.findOne({ where: { valor: EstadoOferta.ELIMINADA } });
    if (!estadoEliminada) throw new NotFoundException('Estado ELIMINADA no encontrado');
    oferta.estado = estadoEliminada;
    //actualizar las solicitudes asociadas a esta oferta a estado OFERTA_ELIMINADA
    
    const solicitudes = await this.solicitudEmpleoRepository.find({ where: { ofertaEmpleo: { id } }, relations: ['estado', 'ofertaEmpleo'] });
    const estadoSolicitudEliminada = await this.estadoRepository.findOne({ where: { valor: EstadoSolicitud.OFERTA_ELIMINADA } });
    if (!estadoSolicitudEliminada) throw new NotFoundException('Estado OFERTA_ELIMINADA no encontrado para solicitudes');
    oferta.solicitudes.forEach(solicitud => {
      solicitud.estado = estadoSolicitudEliminada;
      
    });

    return this.ofertaEmpleoRepository.save(oferta);
  }

  async findAll(): Promise<OfertaEmpleo[]> {
    return this.ofertaEmpleoRepository.find();
  }

  async findOne(id: number, options?: { relations?: string[] }): Promise<OfertaEmpleo | null> {
  return this.ofertaEmpleoRepository.findOne({
    where: { id },
    relations: options?.relations,
  });
}


  async update(id: number, updateOfertaEmpleoDto: UpdateOfertaEmpleoDto): Promise<OfertaEmpleo | null> {
    await this.ofertaEmpleoRepository.update(id, updateOfertaEmpleoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ofertaEmpleoRepository.delete(id);
  }
}