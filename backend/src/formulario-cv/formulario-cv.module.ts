import { Module } from '@nestjs/common';
import { FormularioCvService } from './formulario-cv.service';
import { FormularioCvController } from './formulario-cv.controller';

@Module({
  controllers: [FormularioCvController],
  providers: [FormularioCvService],
})
export class FormularioCvModule {}
