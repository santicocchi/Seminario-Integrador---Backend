import { Module } from '@nestjs/common';
import { EmpleoOfrecidoService } from './empleo-ofrecido.service';
import { EmpleoOfrecidoController } from './empleo-ofrecido.controller';

@Module({
  controllers: [EmpleoOfrecidoController],
  providers: [EmpleoOfrecidoService],
})
export class EmpleoOfrecidoModule {}
