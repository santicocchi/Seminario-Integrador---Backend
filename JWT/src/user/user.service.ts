import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Crear usuario
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  // Listar todos los usuarios
  async findAll() {
    return this.userRepository.find({
      relations: ['roles', 'permissions'], // solo si existen estas relaciones en la entidad User
    });
  }

  // Buscar un usuario por ID
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'permissions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Actualizar usuario
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'permissions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    // Devuelvo el usuario actualizado con relaciones
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'permissions'],
    });
  }

  // Eliminar usuario
  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
