import { Module } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia])],
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
})
export class ProvinciaModule {}
