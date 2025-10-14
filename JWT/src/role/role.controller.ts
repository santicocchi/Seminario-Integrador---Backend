import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Permissions } from 'src/decorators/permissions.decorators';
import { RoleService } from './role.service';

//el controlador maneja las solicitudes HTTP relacionadas a los roles
// define los endpoints para crear, obtener, actualizar y eliminar roles

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) {}
  
  //endpoint para crear un nuevo rol
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
//endpoint para obtener todos los roles
  @Get()
  @UseGuards(AuthGuard)
  @Permissions(['roles_read'])
  findAll() {
    return this.roleService.findAll();
  }
//endpoint para obtener un rol específico por su ID
  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(['roles_read'])
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }
//endpoint para actualizar un rol específico por su ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

//endpoint para eliminar un rol específico por su ID
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(['roles_delete'])
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}

