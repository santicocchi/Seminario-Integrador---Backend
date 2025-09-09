import { Module } from '@nestjs/common';
import { EstudioService } from './estudio.service';
import { EstudioController } from './estudio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from 'src/entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  controllers: [EstudioController],
  providers: [EstudioService],
})
export class EstudioModule {}
