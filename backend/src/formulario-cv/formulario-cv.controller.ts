import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormularioCvService } from './formulario-cv.service';
import { CreateFormularioCvDto } from './dto/create-formulario-cv.dto';
import { UpdateFormularioCvDto } from './dto/update-formulario-cv.dto';

@Controller('formulario-cv')
export class FormularioCvController {
  constructor(private readonly formularioCvService: FormularioCvService) {}

  @Post()
  create(@Body() createFormularioCvDto: CreateFormularioCvDto) {
    return this.formularioCvService.create(createFormularioCvDto);
  }

  @Get()
  findAll() {
    return this.formularioCvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formularioCvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormularioCvDto: UpdateFormularioCvDto) {
    return this.formularioCvService.update(+id, updateFormularioCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formularioCvService.remove(+id);
  }
}
