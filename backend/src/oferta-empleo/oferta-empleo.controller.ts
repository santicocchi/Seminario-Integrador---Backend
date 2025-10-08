import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { OfertaEmpleoService } from './oferta-empleo.service';
import { CreateOfertaEmpleoDto } from './dto/create-oferta-empleo.dto';
import { UpdateOfertaEmpleoDto } from './dto/update-oferta-empleo.dto';
import { Roles } from '../../../JWT/src/auth/roles.decorator';

@Controller('oferta-empleo')
export class OfertaEmpleoController {
  constructor(private readonly ofertaEmpleoService: OfertaEmpleoService) {}

  @Roles('empresa')
  @Post()
  create(@Request() req, @Body() createOfertaEmpleoDto: CreateOfertaEmpleoDto) {
    // tomamos el id de la empresa desde el token (req.empresa)
    const empresaIdFromToken = req.empresa?.id;
    return this.ofertaEmpleoService.create(createOfertaEmpleoDto, empresaIdFromToken);
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
