import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpleoOfrecidoService } from './empleo-ofrecido.service';
import { CreateEmpleoOfrecidoDto } from './dto/create-empleo-ofrecido.dto';
import { UpdateEmpleoOfrecidoDto } from './dto/update-empleo-ofrecido.dto';

@Controller('empleo-ofrecido')
export class EmpleoOfrecidoController {
  constructor(private readonly empleoOfrecidoService: EmpleoOfrecidoService) {}

  @Post()
  create(@Body() createEmpleoOfrecidoDto: CreateEmpleoOfrecidoDto) {
    return this.empleoOfrecidoService.create(createEmpleoOfrecidoDto);
  }

  @Get()
  findAll() {
    return this.empleoOfrecidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleoOfrecidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpleoOfrecidoDto: UpdateEmpleoOfrecidoDto) {
    return this.empleoOfrecidoService.update(+id, updateEmpleoOfrecidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleoOfrecidoService.remove(+id);
  }
}
