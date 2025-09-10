import { Module } from '@nestjs/common';
import { FormularioCvService } from './formulario-cv.service';
import { FormularioCvController } from './formulario-cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioCv } from './entities/formulario-cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormularioCv])],
  controllers: [FormularioCvController],
  providers: [FormularioCvService],
})
export class FormularioCvModule {}
