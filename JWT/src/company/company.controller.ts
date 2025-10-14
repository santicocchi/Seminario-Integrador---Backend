import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Permissions } from 'src/decorators/permissions.decorators';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(['companies_create'])
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(['companies_read'])
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(['companies_read'])
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(['companies_update'])
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(['companies_delete'])
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
