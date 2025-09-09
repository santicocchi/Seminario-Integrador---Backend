import { Module } from '@nestjs/common';
import { EmpleoOfrecidoService } from './empleo-ofrecido.service';
import { EmpleoOfrecidoController } from './empleo-ofrecido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleoOfrecido } from './entities/empleo-ofrecido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpleoOfrecido])],
  controllers: [EmpleoOfrecidoController],
  providers: [EmpleoOfrecidoService],
})
export class EmpleoOfrecidoModule {}
