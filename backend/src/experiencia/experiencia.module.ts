import { Module } from '@nestjs/common';
import { ExperienciaService } from './experiencia.service';
import { ExperienciaController } from './experiencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiencia } from 'src/entities/experiencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experiencia])],
  controllers: [ExperienciaController],
  providers: [ExperienciaService],
})
export class ExperienciaModule {}
