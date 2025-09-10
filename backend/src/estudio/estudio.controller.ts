import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudioService } from './estudio.service';
import { CreateEstudioDto } from './dto/create-estudio.dto';
import { UpdateEstudioDto } from './dto/update-estudio.dto';

@Controller('estudio')
export class EstudioController {
  constructor(private readonly estudioService: EstudioService) {}

  @Post()
  create(@Body() createEstudioDto: CreateEstudioDto) {
    return this.estudioService.create(createEstudioDto);
  }

  @Get()
  findAll() {
    return this.estudioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudioDto: UpdateEstudioDto) {
    return this.estudioService.update(+id, updateEstudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudioService.remove(+id);
  }
}
