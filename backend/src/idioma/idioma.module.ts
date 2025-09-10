import { Module } from '@nestjs/common';
import { IdiomaService } from './idioma.service';
import { IdiomaController } from './idioma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idioma } from './entities/idioma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Idioma])],
  controllers: [IdiomaController],
  providers: [IdiomaService],
})
export class IdiomaModule {}
