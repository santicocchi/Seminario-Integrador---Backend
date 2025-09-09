import { Module } from '@nestjs/common';
import { EstudioService } from './estudio.service';
import { EstudioController } from './estudio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudio } from './entities/estudio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudio])],
  controllers: [EstudioController],
  providers: [EstudioService],
})
export class EstudioModule {}
