import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfertaEmpleoService } from './oferta-empleo.service';
import { CreateOfertaEmpleoDto } from './dto/create-oferta-empleo.dto';
import { UpdateOfertaEmpleoDto } from './dto/update-oferta-empleo.dto';

@Controller('oferta-empleo')
export class OfertaEmpleoController {
  constructor(private readonly ofertaEmpleoService: OfertaEmpleoService) {}

  @Post()
  create(@Body() createOfertaEmpleoDto: CreateOfertaEmpleoDto) {
    return this.ofertaEmpleoService.create(createOfertaEmpleoDto);
  }

  @Get()
  findAll() {
    return this.ofertaEmpleoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ofertaEmpleoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfertaEmpleoDto: UpdateOfertaEmpleoDto) {
    return this.ofertaEmpleoService.update(+id, updateOfertaEmpleoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ofertaEmpleoService.remove(+id);
  }
}
