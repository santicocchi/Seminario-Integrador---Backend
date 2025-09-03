import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudEmpleoService } from './solicitud-empleo.service';
import { CreateSolicitudEmpleoDto } from './dto/create-solicitud-empleo.dto';
import { UpdateSolicitudEmpleoDto } from './dto/update-solicitud-empleo.dto';

@Controller('solicitud-empleo')
export class SolicitudEmpleoController {
  constructor(private readonly solicitudEmpleoService: SolicitudEmpleoService) {}

  @Post()
  create(@Body() createSolicitudEmpleoDto: CreateSolicitudEmpleoDto) {
    return this.solicitudEmpleoService.create(createSolicitudEmpleoDto);
  }

  @Get()
  findAll() {
    return this.solicitudEmpleoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudEmpleoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudEmpleoDto: UpdateSolicitudEmpleoDto) {
    return this.solicitudEmpleoService.update(+id, updateSolicitudEmpleoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudEmpleoService.remove(+id);
  }
}
